import { bumpPomoCountsStore, pullPomoCountsStore } from "../stores/pomocounts";
import { initDb, pomoCollection } from "./pocketbase";
import type { PomoEntry } from "./types";
import { invoke } from "@tauri-apps/api/tauri";

async function sendPomoDoneDb(pomo: PomoEntry) {
  const db = await initDb()
  await db.collection(pomoCollection).create(pomo);
  await pullPomoCountsStore(db);
}

async function sendCompleteNotification(_pomo: PomoEntry) {
  await invoke("notify", { message: "Pomo completed!" });
}


export const runOnComplete = [
  sendPomoDoneDb,
  sendCompleteNotification
];
