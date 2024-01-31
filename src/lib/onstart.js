
import { invoke } from '@tauri-apps/api/tauri';
import { initDb } from './pocketbase';


async function add_db_entry(pomo) {
  const db = await initDb()
  const record = await db.collection('yappy').create(pomo);
  console.log(record);
}

async function send_desktop_notification(pomo) {
  console.log("sending notification");
}

async function send_to_pi(pomo) {
  let task = ""
  if (pomo.task) {
    task = pomo.task
  }
  let dest = "http://192.168.0.203:4173/"
  // dest = "http://localhost:4000/"
  fetch(dest, { method: "POST", body: JSON.stringify({ state: "FOCUS", task }) });
}

async function set_atomic_mode(pomo) {
  await invoke("set_atomic_mode");
}


export const runOnStart = [
  add_db_entry,
  send_desktop_notification,
  send_to_pi,
  set_atomic_mode
];

