import { writable } from 'svelte/store'

export const emptyPomo = {
  pomo_id: undefined,
  time: undefined,
  task: undefined,
  project: undefined,
  status: undefined,
  metadata: undefined,
}

const { subscribe, set, update } = writable(emptyPomo)


export const runningPomoStore = {
  subscribe,
  set,
  update,
}
