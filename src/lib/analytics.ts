import { getNextDay, getWeekday } from "./dates";
import { PomoMessages, type PomoEntry } from "./types";

export type PomoStats = {
  date: Date,
  successes: number,
}


function getDate(pomo: PomoEntry): Date {
  return new Date(pomo.time ?? new Date())
}

export function extractStats(pomos: PomoEntry[], from: Date, to: Date): PomoStats[] {
  let stats: PomoStats[] = []
  for (let date = from; date <= to; date = getNextDay(date)) {
    stats.push({ date, successes: 0 })
  }
  console.log(stats)
  for (let pomo of pomos) {
    let date = getDate(pomo)
    if (date >= from && date <= to) {
      let index = stats.findIndex(stat => date.getDate() === stat.date.getDate())
      console.log(date, index)
      if (pomo.status === PomoMessages.FINISHED) {
        stats[index].successes++
      }
    }
  }

  return stats
}

export function countSuccesses(pomos: PomoEntry[]): number {
  return pomos.filter(pomo => pomo.status === PomoMessages.FINISHED).length
}

export function padStats(stats: PomoStats[]): PomoStats[] {
  let lastEntry = stats[stats.length - 1];

  while (getWeekday(lastEntry.date) !== "SUN") {
    stats.shift();
    const nextDay = getNextDay(lastEntry.date);
    stats.push({ date: nextDay, successes: 0 });
    lastEntry = stats[stats.length - 1];
  }
  // shift whule the first entry is not a monday
  while (getWeekday(stats[0].date) !== "MON") {
    stats.shift();
  }

  return stats;
}
