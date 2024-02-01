import { initDb } from "./pocketbase";


async function sendPomoStoppedPi(pomo) {
  fetch("http://192.168.0.203:4173/", { method: "POST", body: JSON.stringify({ state: "IDLE" }) });
}

async function sendPomoStoppedDb(pomo) {
  const db = await initDb()
  const record = await db.collection('yappy').create(pomo);
}


export const runOnStop = [
  sendPomoStoppedPi,
  sendPomoStoppedDb
];
