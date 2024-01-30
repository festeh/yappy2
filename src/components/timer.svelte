<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { pomodoro, IDLE } from '../stores/pomodoro.js';

	import TaskList from './tasklist.svelte';

	import Remaining from './remaining.svelte';
	import ControlButtons from './controlbuttons.svelte';

	let intervalId;
	let state = IDLE;
	$: state = $pomodoro.state;

	onMount(async () => {
		intervalId = setInterval(() => {
			pomodoro.tick();
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	});
</script>

<div class="flex h-full items-start justify-center text-2xl">
	<div class="flex flex-col">
		<div class="mb-10"></div>
		<Remaining />
		<ControlButtons {state} />
		<TaskList />
	</div>
</div>
