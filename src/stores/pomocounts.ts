import { getDaysBefore, getToday } from "$lib/dates";
import { fetchPomosBetweenDates, initDb } from "$lib/pocketbase";
import { writable } from "svelte/store";

type PomoCounts = {
  today: number;
  week: number;
  month: number;
};

function initPomoCountsStore() {
  let pomos: PomoCounts = {
    today: 0,
    week: 0,
    month: 0,
  };
  return writable(pomos);
}

export async function pullPomoCountsStore() {

  const db = await initDb();
  const to = getToday();
  const fromMonth = getDaysBefore(30 - 1);
  const fromWeek = getDaysBefore(7 - 1);
  const fromToday = getDaysBefore(1 - 1);

  const pomosToday = await fetchPomosBetweenDates(db, fromToday, to);
  const pomosWeek = await fetchPomosBetweenDates(db, fromWeek, to);
  const pomosMonth = await fetchPomosBetweenDates(db, fromMonth, to);
  pomoCountsStore.set({
    today: pomosToday.length,
    week: pomosWeek.length,
    month: pomosMonth.length,
  });

  return writable(0);
}

export async function bumpPomoCountsStore() {
  const current = pomoCountsStore.update((n) => {
    n.today += 1;
    n.week += 1;
    n.month += 1;
    return n;
  });
}

export const pomoCountsStore = initPomoCountsStore();
