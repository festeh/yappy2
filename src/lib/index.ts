// place files you want to import through the `$lib` alias in this folder.
//

export function formatTimer(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  let minutesStr = (minutes < 10 ? '0' : '') + minutes;
  let remainingSecondsStr = (remainingSeconds < 10 ? '0' : '') + remainingSeconds;

  let time = minutesStr + ':' + remainingSecondsStr;
  return time;
}

export function getEnvVariables() {
  let data = {
    API_KEY: import.meta.env.VITE_TODOIST_API_KEY,
  };
  let dataStr = JSON.stringify(data);
  return dataStr;
}

