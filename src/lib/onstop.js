

async function send_to_pi(pomo) {
  fetch("http://192.168.0.203:4173/", { method: "POST", body: JSON.stringify({ state: "IDLE" }) });
}


export const runOnStop = [
  send_to_pi
];
