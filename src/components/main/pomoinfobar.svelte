<script lang="ts">
	import { onMount } from 'svelte';
	import PomoInfo from './pomoinfo.svelte';
	import { pomoCountsStore, pullPomoCountsStore } from '../../stores/pomocounts';

	onMount(async () => {
		await pullPomoCountsStore();
	});

</script>

<div class="flex justify-evenly text-sm">
	<PomoInfo duration="Today" pomoCount={$pomoCountsStore.today} />
	<PomoInfo duration="Week" pomoCount={$pomoCountsStore.week} />
	<PomoInfo duration="Month" pomoCount={$pomoCountsStore.month} />
</div>
