<script>
	import { settingsStore } from '../../stores/settings.js';
	import { SlideToggle } from '@skeletonlabs/skeleton';

  $: console.log($settingsStore);

</script>

<div class="flex flex-col items-center p-8">
	<h1 class="text-xl">Settings</h1>
	<div class="self-start">
		<div class="flex flex-col rounded-xl border border-primary-500 p-2">
			<span class="mb-2 self-center text-sm font-bold text-primary-500"> Enable start hooks </span>
			<ul class="list">
				{#each Object.entries($settingsStore) as item}
					<li>
						<SlideToggle
							name="slider-label"
							active="bg-primary-500"
							background="bg-gray-500"
							bind:checked={$settingsStore[item[0]]}>{item[0]}</SlideToggle
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
