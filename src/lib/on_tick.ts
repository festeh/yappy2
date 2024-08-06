import { invoke } from "@tauri-apps/api/tauri";

async function updateAgsStatus() {
  const random = Math.floor(Math.random() * 100).toString();
  await invoke("update_ags_status", { status: random });
}

export const runOnTick = [
  updateAgsStatus
];
