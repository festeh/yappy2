import { v4 } from 'uuid';
import { selectedTaskStore } from '../stores/tasks.js';

export function initPomo() {
  const seletectedTask = selectedTaskStore.get();
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

