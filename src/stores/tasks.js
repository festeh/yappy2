import { writable } from "svelte/store"

const selectedTask = {}

const { subscribe, set, update } = writable(selectedTask)


export const selectedTaskStore = {
  subscribe,
  set,
  update,
  setSelectedTask: (task) => {
    update(selectedTask => {
      selectedTask.selectedTask = task
      return selectedTask
    })
  },
  getSelectedTask: () => {
    return selectedTask.selectedTask
  },
}
