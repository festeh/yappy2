import { writable } from "svelte/store"

const selectedTask = {
  content: undefined,
  project: undefined,
}

const { subscribe, set, update } = writable(selectedTask)


export const selectedTaskStore = {
  subscribe,
  set,
  update,
}
