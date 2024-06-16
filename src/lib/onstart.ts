import { invoke } from '@tauri-apps/api/tauri';
import { initDb, pomoCollection } from './pocketbase';
import type { PomoEntry } from './types';
import { get } from 'svelte/store';
import { settingsStore, type Settings } from '../stores/settings';

async function sendPomoStartedDb(pomo: PomoEntry) {
  const db = await initDb()
  const record = await db.collection(pomoCollection).create(pomo);
  console.log(record);
}

async function sendPomoStartedDesktop(_pomo: PomoEntry) {
  console.log("sending notification");
}

async function sendPomoInfoPi(pomo: PomoEntry) {
  console.log("sending info to pi");
  let task = ""
  if (pomo.task) {
    task = pomo.task
  }
  const settings: Settings = get(settingsStore);
  const duration = settings.duration;
  let dest = "http://192.168.0.203:4173/"
  // dest = "http://localhost:4000/"
  fetch(dest, { method: "POST", body: JSON.stringify({ state: "FOCUS", task, duration }) });
}

async function startAtomicMode(_pomo: PomoEntry) {
  await invoke("set_atomic_mode");
}


export const runOnStart = [
  sendPomoStartedDb,
  sendPomoStartedDesktop,
  sendPomoInfoPi,
  startAtomicMode
];

