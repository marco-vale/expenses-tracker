
/**
 * Formats a number string by trimming whitespace and replacing commas with periods.
 * This is useful for normalizing numeric input from different locales where commas
 * are used as decimal separators.
 *
 * @param numberString - The string representation of a number to format
 * @returns The formatted number string with whitespace removed and commas replaced by periods
 *
 * @example
 * ```typescript
 * formatNumberString("1,5") // returns "1.5"
 * formatNumberString(" 10,50 ") // returns "10.50"
 * ```
 */
export const formatNumberString = (numberString: string): string => {
  return numberString.trim().replace(',', '.');
};
