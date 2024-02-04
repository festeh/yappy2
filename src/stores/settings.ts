
import { writable } from 'svelte/store'

import { runOnStart } from '$lib/onstart'
import { runOnComplete } from '$lib/oncomplete';
import { runOnStop } from '$lib/onstop';
import type { CallbackFn } from '$lib/types';


type FunctionMap = {
  [key: string]: boolean;
};

function gatherFunctions(funcs: CallbackFn[]): FunctionMap {
  return funcs.reduce(function(obj: FunctionMap, func: CallbackFn) {
    obj[func.name] = true;
    return obj;
  }, {});
}

export type Settings = {
  runOnStart: FunctionMap;
  runOnComplete: FunctionMap;
  runOnStop: FunctionMap;
  duration: number;
};

const settings: Settings = {
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

