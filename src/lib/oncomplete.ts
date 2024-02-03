import { initDb } from "./pocketbase";
import type { PomoEntry } from "./types";

async function sendPomoDoneDb(pomo: PomoEntry) {
  const db = await initDb()
  await db.collection('yappy').create(pomo);
}


export const runOnComplete = [
  sendPomoDoneDb
];
