function convertUTCDateToIndonesiaDate(date: Date) {
  const newDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000,
  );

  const offset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();

  newDate.setHours(hours - offset);

  const indonesiaDateStr = new Intl.DateTimeFormat("id", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // timeZoneName: "short",
  }).format(newDate);

  return indonesiaDateStr;
}

export default convertUTCDateToIndonesiaDate;
