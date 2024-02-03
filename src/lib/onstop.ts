import { initDb } from "./pocketbase";
import type { PomoEntry } from "./types";


async function sendPomoStoppedPi(_pomo: PomoEntry) {
  fetch("http://192.168.0.203:4173/", { method: "POST", body: JSON.stringify({ state: "IDLE" }) });
}

async function sendPomoStoppedDb(pomo: PomoEntry) {
  const db = await initDb()
  const record = await db.collection('yappy').create(pomo);
  console.log(record, "sent stopped");
}


export const runOnStop = [
  sendPomoStoppedPi,
  sendPomoStoppedDb
];
