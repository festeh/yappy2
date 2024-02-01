import { initDb } from "./pocketbase";

async function sendPomoDoneDb(pomo) {
  const db = await initDb()
  await db.collection('yappy').create(pomo);
}


export const runOnComplete = [
  sendPomoDoneDb
];
