export const pomoStates = {
  RUNNING: 'running',
  PAUSED: 'paused',
  IDLE: 'idle',
};

export enum PomoMessages {
  STARTED = 'started',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
}

interface PomoMetadata {
  duration: number;
}

export class PomoEntry {
  pomo_id: string | undefined
  time: string | undefined
  task: string | undefined
  project: string | undefined
  status: PomoMessages | undefined
  metadata: PomoMetadata | undefined

  constructor({ pomo_id, time, task, project, status, metadata }: PomoEntry) {
    this.pomo_id = pomo_id;
    this.time = time;
    this.task = task;
    this.project = project;
    this.status = status;
    this.metadata = metadata;
  }
}

export type CallbackFn = (pomo: PomoEntry) => Promise<void>;
