
import { writable } from 'svelte/store'

import {runOnStart} from '$lib/onstart'



const settings = runOnStart.reduce(function(obj, func) {
    obj[func.name] = true;
    return obj;
}, {});

const { subscribe, set, update } = writable(settings)


export const settingsStore = {
  subscribe,
  set,
  update,
  getSettings: () => {
    return settings
  },
  // setEnableHooks: (enableHooks) => {
  //   update(settings => {
  //     settings.enableHooks = enableHooks
  //     return settings
  //   })
  // },
  // getEnableHooks: () => {
    // return settings.enableHooks
  // },
}

