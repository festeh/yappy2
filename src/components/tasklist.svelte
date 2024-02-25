<script lang="ts">
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import { getTodayTasks, getProjectName } from '$lib/todoist';
	import { selectedTaskStore } from '../stores/tasks';
	import { projectsStore } from '../stores/projects';
	import { get } from 'svelte/store';

	let tasksLoaded = false;
	let tasks: Array<any> = [];
	let selectedTaskId: string | null = null;

	$: {
		if (selectedTaskId !== null) {
			const task = tasks.find((task) => task.id === selectedTaskId);
			if (task) {
				const project = $projectsStore[task.projectId];
				selectedTaskStore.set({ content: task.content, project });
			}
		}
	}

	async function getProjectNameLocal(projectId: string) {
		const projectNames = get(projectsStore);
		console.log('Getting project name for ' + projectId);
		const projectName = projectNames[projectId];
		if (projectName !== undefined) {
			console.log('Project name already cached', projectName);
			return projectName;
		}
		console.log('Project name not cached, fetching');
		Promise.resolve(getProjectName(projectId)).then((name) => {
			projectsStore.update((names) => {
				names[projectId] = name!;
				return names;
			});
		});
		console.log('Project name fetched');
	}

	onMount(async () => {
		tasks = await getTodayTasks();
		tasksLoaded = true;

		for (const task of tasks) {
			await getProjectNameLocal(task.projectId);
		}
	});

	onDestroy(() => {
		tasksLoaded = false;
	});

	function selectTask(event) {
		selectedTaskId = event.target.id;
	}

	function selectFirstTask() {
		if (tasks.length === 0) return;
		const id = tasks[0].id;
		selectedTaskId = id;
	}

	function selectLastTask() {
		if (tasks.length === 0) return;
		const id = tasks[tasks.length - 1].id;
		selectedTaskId = id;
		// scroll to the bottom
	}

	function nextTask(direction: number) {
		const index = tasks.findIndex((task) => task.id === selectedTaskId);
		if (index === -1) {
			selectFirstTask();
		} else {
			const nextIndex = index + direction;
			if (nextIndex < tasks.length && nextIndex >= 0) {
				selectedTaskId = tasks[nextIndex].id;
			} else if (nextIndex >= tasks.length) {
				selectFirstTask();
			} else if (nextIndex < 0) {
				selectLastTask();
			}
		}
		document
			?.getElementById(selectedTaskId!)
			?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
		selectedTaskId = null;
		tasks = [];
		tasksLoaded = false;

		tasks = await getTodayTasks();
		tasksLoaded = true;
	}
</script>

{#if !tasksLoaded}
	<p>Tasks loading...</p>
{:else}
	<div class="flex max-h-[50vh] flex-col overflow-auto">
		<button
			class="btn btn-sm flex-grow-0 self-end rounded-xl border border-primary-500 pl-2 pr-2 text-sm font-bold"
			on:click={resetTasks}
		>
			Reset
		</button>
		<ul class="list rounded-3xl border border-secondary-500 shadow-primary-50">
			{#each tasks as task (task.id)}
				<li class="list-option" class:selected={task.id === selectedTaskId}>
					<!-- svelte-ignore a11y-interactive-supports-focus -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span class="flex-auto" on:click={selectTask} role="menuitem" id={task.id}>
						{task.content}
					</span>
					<span class="text-sm text-gray-400"> {$projectsStore[task.projectId]} </span>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	.selected {
		@apply bg-primary-500 text-white hover:bg-primary-600;
	}
</style>
