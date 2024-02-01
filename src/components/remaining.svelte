<script lang="ts">
	import { formatTimer } from '$lib/index.js';
	import { engine } from '../stores/engine.js';
	import DurationButton from './duration.svelte';
	import { changePomoDuration } from '$lib/buttons/duration.js';

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
