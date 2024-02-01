
import { writable } from 'svelte/store'

import { runOnStart } from '$lib/onstart'
import { runOnComplete } from '$lib/oncomplete';
import { runOnStop } from '$lib/onstop';


function gatherFunctions(funcs) {
  return funcs.reduce(function(obj, func) {
    obj[func.name] = true;
    return obj;
  }, {});
}

const settings = {
  runOnStart: gatherFunctions(runOnStart),
  runOnComplete: gatherFunctions(runOnComplete),
  runOnStop: gatherFunctions(runOnStop),
  duration: 25,
}

const { subscribe, set, update } = writable(settings)


export const settingsStore = {
  subscribe,
  set,
  update,
}

