<script lang="ts">
	import { initDb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { getToday, getDaysBefore } from '$lib/dates';
	import { fetchPomosBetweenDates } from '$lib/pocketbase';
	import Week from './analytics/week.svelte';
	import { extractStats, padStats, type PomoStats } from '$lib/analytics';

	let thisWeekStats: PomoStats[] = [];
	let lastWeekStats: PomoStats[] = [];

	onMount(async () => {
		const db = await initDb();
		const from = getDaysBefore(14);
		const to = getToday();
		const pomos = await fetchPomosBetweenDates(db, from, to);
		const stats = padStats(extractStats(pomos, from, to));
    thisWeekStats = stats.slice(7);
    lastWeekStats = stats.slice(0, 7);
		console.log(pomos);
	});
</script>

<div>
	<h1>Analytics</h1>
	<div class="flex flex-col justify-center w-full">
		<Week stats={lastWeekStats}></Week>
		<Week stats={thisWeekStats}></Week>
	</div>
</div>
