
import { writable } from 'svelte/store'



const settings = {
  enableHooks: true,
}

const { subscribe, set, update } = writable(settings)


export const settingsStore = {
  subscribe,
  set,
  update,
  setEnableHooks: (enableHooks) => {
    update(settings => {
      settings.enableHooks = enableHooks
      return settings
    })
  },
  getEnableHooks: () => {
    return settings.enableHooks
  },
}

