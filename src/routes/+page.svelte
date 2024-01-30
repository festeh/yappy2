<script>
	import { goto } from '$app/navigation';
	import Analytics from '../components/analytics.svelte';
	import Timer from '../components/timer.svelte';

	document.addEventListener('keydown', (ev) => {
		if (ev.key === 'S') {
			goto('/settings');
		}
    if (ev.key === 'A') {
      goto('/analytics');
    }
    if (ev.key === 'T') {
      goto('/');
    }
	});
</script>

<Timer />
<!-- <Analytics /> -->
