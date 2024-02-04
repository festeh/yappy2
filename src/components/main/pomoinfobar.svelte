<script lang="ts">
	import { countSuccesses } from '$lib/analytics';
	import { getDaysBefore, getToday } from '$lib/dates';
	import { fetchPomosBetweenDates, initDb } from '$lib/pocketbase';
	import type { PomoEntry } from '$lib/types';
	import { onMount } from 'svelte';
	import PomoInfo from './pomoinfo.svelte';

	let pomosToday: PomoEntry[] = [];
	let pomosWeek: PomoEntry[] = [];
	let pomosMonth: PomoEntry[] = [];

	onMount(async () => {
		const db = await initDb();
		const to = getToday();
		const fromMonth = getDaysBefore(30 - 1);
		const fromWeek = getDaysBefore(7 - 1);
		const fromToday = getDaysBefore(1 - 1);

		pomosToday = await fetchPomosBetweenDates(db, fromToday, to);
		pomosWeek = await fetchPomosBetweenDates(db, fromWeek, to);
		pomosMonth = await fetchPomosBetweenDates(db, fromMonth, to);
	});
</script>

<div class="flex justify-evenly text-sm">
	<PomoInfo duration="Today" pomoCount={countSuccesses(pomosToday)} />
	<PomoInfo duration="Week" pomoCount={countSuccesses(pomosWeek)} />
	<PomoInfo duration="Month" pomoCount={countSuccesses(pomosMonth)} />
</div>
