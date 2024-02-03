<script>
	import { settingsStore } from '../../stores/settings';
	import SettingsHooksGroup from '../../components/settings_hooks_group.svelte';
  import Slider from '../../components/settings/slider.svelte';
	$: console.log($settingsStore);
</script>

<div class="flex h-full flex-col items-start justify-start p-8">
	<h1 class="text-xl">Settings</h1>
	<div
		class="flex-grow-1 flex h-full flex-col justify-evenly rounded-xl border border-primary-500 p-2"
	>
    <Slider title="Pomo Duration" storeKey="duration" min={5} max={40} step={5} />
		<SettingsHooksGroup group_name={'runOnStart'} hooks={$settingsStore.runOnStart} />
		<SettingsHooksGroup group_name={'runOnStop'} hooks={$settingsStore.runOnStop} />
		<SettingsHooksGroup group_name={'runOnComplete'} hooks={$settingsStore.runOnComplete} />
	</div>
</div>
