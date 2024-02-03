import { settingsStore } from '../../stores/settings';


export function changePomoDuration(direction: string) {
  if (direction === '+') {
    settingsStore.update((settings) => {
      if (settings.duration >= 60) return settings;
      settings.duration += 5;
      return settings;
    });
  } else {
    settingsStore.update((settings) => {
      if (settings.duration <= 5) return settings;
      settings.duration -= 5;
      return settings;
    });
  }
}
