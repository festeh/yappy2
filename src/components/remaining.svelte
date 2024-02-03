<script lang="ts">
	import { formatTimer } from '$lib/index';
	import { changePomoDuration } from '$lib/buttons/duration';
	import { engine } from '../stores/engine';

	import DurationButton from './duration.svelte';

	document.addEventListener('keydown', (ev) => {
		if (ev.key === '+' || ev.key === '-') {
			changePomoDuration(ev.key);
		}
	});
</script>

<div class="flex self-center">
	<DurationButton title={'-'} />
	<p class="mb-6 self-center text-8xl">{formatTimer($engine.remaining)}</p>
	<DurationButton title={'+'} />
</div>
