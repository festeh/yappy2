import { selectedTaskStore } from '../stores/tasks';
import { runningPomoStore } from '../stores/running';
import { get } from 'svelte/store';
import { PomoMessages, type PomoEntry } from './types';

export function initPomo() {
  const selectedTask = get(selectedTaskStore);
  const pomo: PomoEntry = {
    task: selectedTask.content,
    project: selectedTask.project,
    metadata: {
      duration: 25,
    },
    status: PomoMessages.STARTED,
    time: undefined,
  };
  pomo.time = new Date().toISOString();
  runningPomoStore.set(pomo);
  return pomo;
}


export function getRunningPomo(status: PomoMessages) {
  let pomo = get(runningPomoStore);
  pomo.time = new Date().toISOString();
  pomo.status = status;
  return pomo;
}
