<script>
	import { formatTimer } from '$lib/index.js';
	import { pomodoro } from '../stores/pomodoro.js';
</script>

<p class="mb-6 text-8xl self-center">{formatTimer($pomodoro.remaining)}</p>
