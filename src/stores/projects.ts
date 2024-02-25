import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

type ProjectMap = {
  [key: string]: string;
};

export const projectsStore: Writable<ProjectMap> = localStorageStore('projects', {});
