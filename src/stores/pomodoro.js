import { writable } from 'svelte/store';

export const RUNNING = Symbol('running');
const PAUSED = Symbol('paused');
export const IDLE = Symbol('idle');

const kDuration = 25 * 60; // 25 minutes in seconds

// Define initial state
const initialState = {
  total: kDuration, // 25 minutes in seconds
  remaining: kDuration, // 25 minutes in seconds
  state: IDLE
};

function updateTimer(timer) {
  if (timer.state === RUNNING && timer.remaining > 0) {
    timer.remaining--;
  }
  if (timer.remaining <= 0) {
    timer.state = IDLE;
    timer.remaining = kDuration;
  }
}

// Create the store
const createPomodoroStore = () => {
  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    start: () => update(timer => ({ ...timer, state: RUNNING })),
    pause: () => update(timer => ({ ...timer, state: PAUSED })),
    reset: () => set(initialState),
    tick: () => update(timer => {
      updateTimer(timer);
      return timer;
    })
  };
};

export const pomodoro = createPomodoroStore();
