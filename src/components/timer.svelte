<script lang="ts">
	import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';

	import TaskList from './tasklist.svelte';

	import Remaining from './remaining.svelte';
	import ControlButtons from './controlbuttons.svelte';

	import { pomoStates } from '$lib/constants.js';
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

<div class="flex h-full items-start justify-center text-2xl">
	<div class="flex flex-col">
		<div class="mb-10"></div>
		<Remaining />
		<ControlButtons {state} />
		<TaskList />
	</div>
</div>
