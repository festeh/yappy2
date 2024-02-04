<script lang="ts">
	import WeekDay from './weekday.svelte';
	import type { PomoStats } from '$lib/analytics';

	export let stats: PomoStats[];
</script>

<div class="flex flex-row text-2xl">
	{#each stats as { date, successes }}
		<WeekDay {date} {successes} />
	{/each}
</div>
