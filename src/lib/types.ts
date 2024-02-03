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

export interface PomoEntry {
  pomo_id: string | undefined,
  time: string | undefined,
  task: string | undefined,
  project: string | undefined,
  status: PomoMessages | undefined,
  metadata: PomoMetadata | undefined,
}
