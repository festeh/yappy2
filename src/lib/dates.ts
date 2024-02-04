
export function getToday() {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return today
}

export function getDaysBefore(days: number) {
  const today = new Date();
  const daysBefore = new Date(today);
  daysBefore.setDate(today.getDate() - days);
  daysBefore.setHours(0, 0, 0, 0);
  return daysBefore
}

export function getYesterday() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return yesterday
}

export function getLastWeek() {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  return lastWeek
}

export function getLastMonth() {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);
  return lastMonth
}

export function getNextDay(date: Date) {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  return nextDay
}

export function getWeekday(date: Date): string {
  let weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let weekday = weekdays[date.getDay()];
  return weekday
}

export function getMonth(date: Date): string {
  let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  let month = months[date.getMonth()];
  return month
}
