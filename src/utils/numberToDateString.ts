/**
 * This function converts a number to a string and pads it with a 0 if it is less than 10.
 * example: 1 -> "01"
 * example: 10 -> "10" (no change)
 */
export function numberToDateString(number: number) {
  return number.toString().padStart(2, "0");
}
