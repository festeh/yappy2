import { writable } from 'svelte/store';
import { runOnComplete } from '$lib/oncomplete';
import { getRunningPomo } from '$lib/pomo';
import { PomoMessages, pomoStates } from '$lib/types';
import { get } from 'svelte/store';
import { settingsStore } from './settings';


function getDuration() {
  return get(settingsStore).duration * 60;
}

interface PomoState {
  remaining: number;
  status: pomoStates;
  project: string;
  task: string;
}

const initialState: PomoState = {
  remaining: getDuration(),
  status: pomoStates.IDLE,
  project: "",
  task: ""
};

function updateState(state: PomoState) {
  if (state.status === pomoStates.RUNNING && state.remaining > 0) {
    state.remaining--;
  }
  if (state.remaining <= 0) {
    state.status = pomoStates.IDLE
    state.remaining = getDuration();
    const settings = get(settingsStore);
    const pomo = getRunningPomo(PomoMessages.FINISHED);
    for (const func of runOnComplete) {
      if (settings.runOnComplete[func.name]) {
        func(pomo);
      }
    }
  }
  if (state.status === pomoStates.IDLE) {
    state.remaining = getDuration();
  }
}

// Create the store
const createPomodoroStore = () => {
  const { subscribe, set, update } = writable(initialState);

  // runOnStart, runOnComplete, runOnStop;

  return {
    subscribe,
    start: (task: string, project: string) => {
      const settings = get(settingsStore);
      runOnStart.forEach((func) => {
        if (settings['runOnStart'][func.name] === true) {
          func();
        } else {
          console.log('Hook disabled: ' + func.name);
        }
      });
      update(state => ({ ...state, status: pomoStates.RUNNING, task, project }))
    },
    pause: () => update(state => ({ ...state, status: pomoStates.PAUSED })),
    reset: () => set(initialState),
    tick: () => update(state => {
      updateState(state);
      return state;
    })
  };
};

export const engine = createPomodoroStore();
