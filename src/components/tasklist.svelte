<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { getTodayTasks, getProjectName } from '$lib/todoist.ts';
	import { selectedTaskStore } from '../stores/tasks.js';

	let tasksLoaded = false;
	let tasks = [];
	let seletedTaskId = null;

	$: {
		if (seletedTaskId !== null) {
			const task = tasks.find((task) => task.id === seletedTaskId);
			if (task) {
				const project = projectNames[task.projectId];
				selectedTaskStore.set({ content: task.content, project });
			}
		}
	}

	onMount(async () => {
		tasks = await getTodayTasks();
		tasksLoaded = true;

		for (const task of tasks) {
			await getProjectNameLocal(task.projectId);
		}

		return () => {
			tasksLoaded = false;
		};
	});

	function selectTask(event) {
		seletedTaskId = event.target.id;
	}

	function selectFirstTask() {
		if (tasks.length === 0) return;
		const id = tasks[0].id;
		seletedTaskId = id;
	}

	function selectLastTask() {
		if (tasks.length === 0) return;
		const id = tasks[tasks.length - 1].id;
		seletedTaskId = id;
	}

	function nextTask(direction) {
		const index = tasks.findIndex((task) => task.id === seletedTaskId);
		if (index === -1) {
			selectFirstTask();
		} else {
			const nextIndex = index + direction;
			if (nextIndex < tasks.length && nextIndex >= 0) {
				seletedTaskId = tasks[nextIndex].id;
			} else if (nextIndex >= tasks.length) {
				selectFirstTask();
			} else if (nextIndex < 0) {
				selectLastTask();
			}
		}
	}

	document.addEventListener('keydown', (ev) => {
		if (ev.key === 'j') {
			nextTask(1);
		}
		if (ev.key === 'k') {
			nextTask(-1);
		}
		if (ev.key === 'R') {
			resetTasks();
		}
	});

	async function resetTasks() {
		seletedTaskId = null;
		tasks = [];
		tasksLoaded = false;

		tasks = await getTodayTasks();
		tasksLoaded = true;
	}

	let projectNames = {};

	async function getProjectNameLocal(projectId) {
		if (projectId in projectNames) {
			return projectNames[projectId];
		}
		Promise.resolve(getProjectName(projectId)).then((name) => {
			projectNames = { ...projectNames, [projectId]: name };
		});
	}
</script>

<div class="self-center">
	{#if !tasksLoaded}
		<p>Tasks loading...</p>
	{:else}
		<div class="flex flex-col">
			<button
				class="btn btn-sm flex-grow-0 self-end rounded-xl border border-primary-500 pl-2 pr-2 text-sm font-bold"
				on:click={resetTasks}
			>
				Reset
			</button>
			<ul class="list rounded-3xl border border-secondary-500 shadow-primary-50">
				{#each tasks as task (task.id)}
					<li class="list-option" class:selected={task.id === seletedTaskId}>
						<!-- svelte-ignore a11y-interactive-supports-focus -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<span class="flex-auto" on:click={selectTask} role="menuitem" id={task.id}>
							{task.content}
						</span>
						<span class="text-sm text-gray-400"> {projectNames[task.projectId]} </span>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	.selected {
		@apply bg-primary-500 text-white hover:bg-primary-600;
	}
</style>
