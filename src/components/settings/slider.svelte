<script lang="ts">
	import type { Settings } from '../../stores/settings';

	export let title = '';
	export let storeKey: keyof Settings = 'duration';
	export let min = 0;
	export let max = 60;
	export let step = 1;
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import { settingsStore } from '../../stores/settings';
</script>

<div class="flex flex-col pl-2 pr-2">
	<RangeSlider bind:value={$settingsStore[storeKey]} {min} {max} {step} ticked>
		<div class="flex items-center justify-between">
			<div class="font-bold">{title}</div>
			<div class="text-xs">{$settingsStore[storeKey]} min</div>
		</div>
	</RangeSlider>
</div>
