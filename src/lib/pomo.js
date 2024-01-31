import { v4 } from 'uuid';
import { selectedTaskStore } from '../stores/tasks.js';
import { get } from 'svelte/store';

export function initPomo() {
  const seletectedTask = get(selectedTaskStore);
  console.log("Seltected task", seletectedTask);
  return {
    pomo_id: v4(),
    time: new Date().toISOString(),
    task: seletectedTask.content,
    project: seletectedTask.project,
    status: 'STARTED',
    metadata: {
      duration: 25,
    },
  };
}

