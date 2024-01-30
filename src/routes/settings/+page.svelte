<script>
	import { settingsStore } from '../../stores/settings.js';
	import { SlideToggle } from '@skeletonlabs/skeleton';
</script>

<div class="flex flex-col items-center p-8">
	<h1 class="text-xl">Settings</h1>
	<!-- Add a toggle for enabling/disabling hooks -->
	<!-- <label> -->
	<!-- 	<input type="checkbox" bind:checked={$settingsStore.enableHooks} /> -->
	<!-- 	Enable Hooks -->
	<!-- </label> -->
	<div class="self-start">
		<SlideToggle name="slider-label"  active="bg-primary-500"
      background="bg-gray-500" bind:checked={$settingsStore.enableHooks}
    >Enable Hooks</SlideToggle>
	</div>
</div>
