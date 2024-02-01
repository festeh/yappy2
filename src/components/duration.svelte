<script>
	import { changePomoDuration } from '$lib/buttons/duration';
	export let title = '';
</script>

<div class="ml-5 mr-5 flex items-center justify-center border-primary-600 text-5xl font-bold">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="aspect-square rounded-xl border-2 p-5 hover:bg-primary-500"
		on:click={() => changePomoDuration(title)}
	>
		{title}
	</div>
</div>
