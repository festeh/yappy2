import { bumpPomoCountsStore } from "../stores/pomocounts";
import { initDb, pomoCollection } from "./pocketbase";
import type { PomoEntry } from "./types";
import { invoke } from "@tauri-apps/api/tauri";

async function sendPomoDoneDb(pomo: PomoEntry) {
  const db = await initDb()
  await db.collection(pomoCollection).create(pomo);
}

async function bumpPomoCounts(_pomo: PomoEntry) {
  await bumpPomoCountsStore();
}

async function sendCompleteNotification(_pomo: PomoEntry) {
  await invoke("notify", { message: "Pomo completed!" });
}


export const runOnComplete = [
  sendPomoDoneDb,
  bumpPomoCounts,
  sendCompleteNotification
];
