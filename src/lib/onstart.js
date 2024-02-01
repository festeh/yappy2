
import { invoke } from '@tauri-apps/api/tauri';
import { initDb } from './pocketbase';


async function sendPomoStartedDb(pomo) {
  const db = await initDb()
  const record = await db.collection('yappy').create(pomo);
}

async function sendPomoStartedDesktop(pomo) {
  console.log("sending notification");
}

async function sendPomoInfoPi(pomo) {
  console.log("sending info to pi");
  let task = ""
  if (pomo.task) {
    task = pomo.task
  }
  let dest = "http://192.168.0.203:4173/"
  // dest = "http://localhost:4000/"
  fetch(dest, { method: "POST", body: JSON.stringify({ state: "FOCUS", task }) });
}

async function startAtomicMode(pomo) {
  await invoke("set_atomic_mode");
}


export const runOnStart = [
  sendPomoStartedDb,
  sendPomoStartedDesktop,
  sendPomoInfoPi,
  startAtomicMode
];

