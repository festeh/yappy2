<script lang="ts">
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';

	import TaskList from './tasklist.svelte';

	import PomoInfoBar from './main/pomoinfobar.svelte';
	import Remaining from './remaining.svelte';
	import ControlButtons from './controlbuttons.svelte';

	import { pomoStates } from '$lib/types';
	import { engine } from '../stores/engine';

	let state = pomoStates.IDLE;
	let intervalId: any = null;
	$: state = $engine.state;

	onMount(async () => {
		intervalId = setInterval(() => {
			engine.tick();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});

	console.log($engine);
</script>

<div class="flex h-screen flex-col justify-evenly text-xl">
	<PomoInfoBar />
	<div class="flex flex-col">
		<Remaining />
		<ControlButtons {state} />
	</div>
	<TaskList />
</div>
