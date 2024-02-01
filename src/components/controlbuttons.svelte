<script lang="ts">
	import { engine } from '../stores/engine.js';
	import { runOnStart } from '$lib/onstart.js';
	import { runOnStop } from '$lib/onstop.js';
	import Icon from '@iconify/svelte';

	import { settingsStore } from '../stores/settings.js';
	import { initPomo } from '$lib/pomo.js';
	import { getRunningPomo } from '$lib/pomo.js';
	import { pomoStates } from '$lib/constants.js';
	import { pomoMessages } from '$lib/constants.js';

	import { get } from 'svelte/store';

	export let state: string;

	function startTimer() {
		const pomo = initPomo();
		const settings = get(settingsStore);
		runOnStart.forEach((func) => {
			if (settings['runOnStart'][func.name] === true) {
				func(pomo);
			} else {
				console.log('Hook disabled: ' + func.name);
			}
		});
		engine.start();
	}

	function pauseTimer() {
		engine.pause();
	}

	function resetTimer() {
		engine.reset();
		const settings = get(settingsStore);
		const pomo = getRunningPomo(pomoMessages.CANCELLED);
		runOnStop.forEach((func) => {
			if (settings['runOnStop'][func.name] === true) {
				func(pomo);
			} else {
				console.log('Hook disabled: ' + func.name);
			}
		});
	}

	window.addEventListener('keydown', (ev) => {
		if (ev.key === 'r') {
			if (state !== pomoStates.RUNNING) {
				startTimer();
			}
		}
		if (ev.key === 'p') {
			if (state === pomoStates.RUNNING) {
				pauseTimer();
			}
		}
		if (ev.key === 's') {
			if (state === pomoStates.RUNNING) {
				resetTimer();
			}
		}
	});
</script>

<div class="mb-8 flex flex-row justify-evenly self-stretch text-6xl">
	{#if state !== pomoStates.RUNNING}
		<button on:click={startTimer}>
			<Icon icon="fa-regular:play-circle" class="h-full text-green-500" />
		</button>
	{/if}
	{#if state === pomoStates.RUNNING}
		<button on:click={pauseTimer}>
			<Icon icon="fa-regular:pause-circle" class="h-full text-primary-500" />
		</button>
		<button on:click={resetTimer}>
			<Icon icon="fa-regular:stop-circle" class="h-full text-primary-500" />
		</button>
	{/if}
</div>
