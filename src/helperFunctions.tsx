import { Birthday } from "./app";

export function getFormattedDate(date: Date) {

  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
export function timeBetween(a: Date, b: Date, millisPerTime: number) {
  return (a.getTime() - b.getTime()) / millisPerTime;
}