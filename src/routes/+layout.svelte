<script>
	import '../app.css';
	import { AppRail, AppRailAnchor, AppShell } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
</script>

<div class="flex h-screen max-h-screen">
	<div class="w-1/5">
		<AppRail class="text-4xl">
			<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
				<svelte:fragment slot="lead">
					<Icon icon="noto:hourglass-not-done" class="h-full" />
				</svelte:fragment>
			</AppRailAnchor>
			<AppRailAnchor href="/analytics" selected={$page.url.pathname === '/analytics'}>
				<svelte:fragment slot="lead">
					<Icon icon="noto:bar-chart" class="h-full" />
				</svelte:fragment>
			</AppRailAnchor>
			<AppRailAnchor href="/settings" selected={$page.url.pathname === '/settings'}>
				<svelte:fragment slot="lead">
					<Icon icon="noto:gear" class="h-full" />
				</svelte:fragment>
			</AppRailAnchor>
		</AppRail>
	</div>
	<slot />
</div>
