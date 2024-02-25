import { bumpPomoCountsStore } from "../stores/pomocounts";
import { initDb } from "./pocketbase";
import type { PomoEntry } from "./types";

async function sendPomoDoneDb(pomo: PomoEntry) {
  const db = await initDb()
  await db.collection('yappy').create(pomo);
}

async function bumpPomoCounts() {
  await bumpPomoCountsStore();
}



export const runOnComplete = [
  sendPomoDoneDb,
  bumpPomoCounts
];
