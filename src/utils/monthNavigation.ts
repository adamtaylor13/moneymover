import { numberToDateString } from "./numberToDateString";

export function getNextMonthUrl(currentMonth: number, currentYear: number) {
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
  return `/${nextYear}/${numberToDateString(nextMonth)}`;
}

export function getPreviousMonthUrl(currentMonth: number, currentYear: number) {
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  return `/${previousYear}/${numberToDateString(previousMonth)}`;
}
