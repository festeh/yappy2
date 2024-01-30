<script>
	export let state = IDLE;

	import { pomodoro, RUNNING, IDLE } from '../stores/pomodoro.js';
	import { runOnStart } from '$lib/onstart.js';
	import { runOnStop } from '$lib/onstop.js';
	import Icon from '@iconify/svelte';

	import { settingsStore } from '../stores/settings.js';
	import { selectedTaskStore } from '../stores/tasks.js';

	function startTimer() {
		pomodoro.start();
		if (!settingsStore.getEnableHooks()) {
			return;
		}
		const pomoInfo = {};
		let task = selectedTaskStore.getSelectedTask();
		pomoInfo.task = task;
		runOnStart.forEach((func) => {
			if (settingsStore.getEnableHooks()[func.name]) {
				task = selectedTaskStore.getSelectedTask();
				pomoInfo.task = task;
				func(pomoInfo);
			}
		});
	}

	function pauseTimer() {
		pomodoro.pause();
	}

	function resetTimer() {
		pomodoro.reset();
		if (!settingsStore.getEnableHooks()) {
			return;
		}
		runOnStop.forEach((func) => {
			func();
		});
	}

	window.addEventListener('keydown', (ev) => {
		if (ev.key === 'r') {
			if (state !== RUNNING) {
				startTimer();
			}
		}
		if (ev.key === 'p') {
			if (state === RUNNING) {
				pauseTimer();
			}
		}
		if (ev.key === 's') {
			if (state === RUNNING) {
				resetTimer();
			}
		}
	});
</script>

<div class="mb-8 flex flex-row justify-evenly self-stretch text-6xl">
	{#if state !== RUNNING}
		<button on:click={startTimer}>
			<Icon icon="fa-regular:play-circle" class="h-full text-green-500" />
		</button>
	{/if}
	{#if state === RUNNING}
		<button on:click={pauseTimer}>
			<Icon icon="fa-regular:pause-circle" class="h-full text-primary-500" />
		</button>
		<button on:click={resetTimer}>
			<Icon icon="fa-regular:stop-circle" class="h-full text-primary-500" />
		</button>
	{/if}
</div>
