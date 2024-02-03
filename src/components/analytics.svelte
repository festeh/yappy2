<script lang="ts">
	import { initDb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { getToday, getLastWeek } from '$lib/dates';
	import { fetchPomosBetweenDates } from '$lib/pocketbase';
	import type { PomoEntry } from '$lib/types';

	let pomos: PomoEntry[] = [];

	onMount(async () => {
		const db = await initDb();
		const from = getLastWeek();
		const to = getToday();
		pomos = await fetchPomosBetweenDates(db, from, to);
		console.log(pomos);
	});
</script>

<div>
	<h1>Analytics</h1>
	{JSON.stringify(pomos)}
</div>
