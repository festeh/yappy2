<script lang="ts">
	import Icon from "@iconify/svelte";

	export let duration: string;
	export let pomoCount: number;
</script>

<div class="flex flex-col justify-between border p-1 rounded-xl border-secondary-600">
	<div class="flex flex-col">
		<div class="">{duration}</div>
	</div>
	<div class="flex flex-row justify-center items-center font-bold text-xl">
		<div class="">{pomoCount}</div>
    <Icon icon="noto:tomato" class="text-primary-600 ml-2" />
	</div>
</div>
