import { writable } from 'svelte/store';
import { runOnComplete } from '$lib/oncomplete';
import { getRunningPomo } from '$lib/pomo';
import { PomoMessages, pomoStates } from '$lib/types';
import { get } from 'svelte/store';
import { settingsStore } from './settings';


function getDuration() {
  console.log(get(settingsStore).duration, 'duration');
  return get(settingsStore).duration * 60;
}

// Define initial state
const initialState = {
  remaining: getDuration(),
  state: pomoStates.IDLE
};

function updateTimer(timer) {
  if (timer.state === pomoStates.RUNNING && timer.remaining > 0) {
    timer.remaining--;
  }
  if (timer.remaining <= 0) {
    timer.state = pomoStates.IDLE
    timer.remaining = getDuration();
    const settings = get(settingsStore);
    const pomo = getRunningPomo(PomoMessages.FINISHED);
    for (const func of runOnComplete) {
      if (settings.runOnComplete[func.name]) {
        func(pomo);
      }
    }
  }
  if (timer.state === pomoStates.IDLE) {
    timer.remaining = getDuration();
  }
}

// Create the store
const createPomodoroStore = () => {
  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    start: () => update(timer => ({ ...timer, state: pomoStates.RUNNING })),
    pause: () => update(timer => ({ ...timer, state: pomoStates.PAUSED })),
    reset: () => set(initialState),
    tick: () => update(timer => {
      updateTimer(timer);
      return timer;
    })
  };
};

export const engine = createPomodoroStore();
