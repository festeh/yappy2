import { v4 } from 'uuid';
import { selectedTaskStore } from '../stores/tasks.js';
import { runningPomoStore } from '../stores/running.js';
import { get } from 'svelte/store';
import { pomoStates } from './constants.js';
import { pomoMessages } from './constants.js';

export function initPomo() {
  const selectedTask = get(selectedTaskStore);
  const pomo = {
    pomo_id: v4(),
    task: selectedTask.content,
    project: selectedTask.project,
    metadata: {
      duration: 25,
    },
    status: undefined,
    time: undefined,
  };
  pomo.status = pomoMessages.STARTED;
  pomo.time = new Date().toISOString();
  runningPomoStore.set(pomo);
  return pomo;
}


export function getRunningPomo(status) {
  let pomo = get(runningPomoStore);
  pomo.time = new Date().toISOString();
  pomo.status = status;
  return pomo;
}
