export enum pomoStates {
  RUNNING = 'running',
  PAUSED = 'paused',
  IDLE = 'idle',
}

export enum PomoMessages {
  STARTED = 'started',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
}

interface PomoMetadata {
  duration: number;
}

export class PomoEntry {
  time: string | undefined
  task: string | undefined
  project: string | undefined
  status: PomoMessages | undefined
  metadata: PomoMetadata | undefined

  constructor({ time, task, project, status, metadata }: PomoEntry) {
    this.time = time;
    this.task = task;
    this.project = project;
    this.status = status;
    this.metadata = metadata;
  }
}

export type CallbackFn = (pomo: PomoEntry) => Promise<void>;
