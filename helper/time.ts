function getUTCOffset(utc: number) {
  if (utc == 0) return utc;
  const offset = -60;
  return utc * offset;
}

export function dateToday() {
  const today = new Date();
  return today;
}

export function convertUTCToCustomZone(dateInput: string, utc: number) {
  const date = new Date(dateInput);

  // comment this bcs utc not used
  // const offset = getUTCOffset(utc) / 60;
  const offset = getUTCOffset(0) / 60;

  const hours = date.getHours();

  date.setHours(hours - offset);

  return date;
}

export function lastActivityHistoryDateStr(date: Date) {
  return Intl.DateTimeFormat("id", {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",

    // hour: "numeric",
    // minute: "numeric",

    // timeZoneName: "short",
  }).format(date);
}

export function dateTodayDateStr(date: Date) {
  return Intl.DateTimeFormat("id", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // timeZoneName: "short",
  }).format(date);
}

export function dateTodayAndTomorrow() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return { today, tomorrow };
}
