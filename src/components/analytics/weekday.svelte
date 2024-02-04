<script lang="ts">
	import { getMonth } from '$lib/dates';
	import Icon from '@iconify/svelte';

	export let date: Date;
	export let successes: number;

  function isToday(date: Date) {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
  }
</script>

<div class="p-1">
	<div class="flex flex-col items-center justify-center border border-primary-600 p-4" class:highlight={isToday(date)}>
		<div class="flex self-center font-bold text-sm text-secondary-300 w-12 justify-center"> {getMonth(date)} {date.getDate()}</div>
		<div class="flex items-center justify-center">
    <Icon icon="noto:tomato" class="text-primary-600 mr-2" />
    <span>{successes}</span>
    </div>
	</div>
</div>

<style>
  .highlight {
    @apply bg-surface-600;
  }
</style>
