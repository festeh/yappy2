<script>
	export let group_name;
	export let hooks;

	import { settingsStore } from '../stores/settings.js';
	import { SlideToggle } from '@skeletonlabs/skeleton';
</script>

<div class="p-3 border-secondary-500 flex border">
	<ul class="list">
		{#each Object.entries(hooks) as item}
			<li>
				<SlideToggle
					name="slider-label"
					active="bg-primary-500"
					background="bg-gray-500"
					bind:checked={$settingsStore[group_name][item[0]]}>{item[0]}</SlideToggle
				>
			</li>
		{/each}
	</ul>
</div>
