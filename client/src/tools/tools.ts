import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * Parses a number string, replacing commas with dots to handle locale-specific decimal separators.
 *
 * @param numberString - The string to parse (e.g. "1,5" or "1.5")
 * @returns The parsed number, or NaN if invalid
 */
export const parseNumberString = (numberString: string): number => {
  return Number(numberString.trim().replace(',', '.'));
};

/**
 * Formats a number as a currency string with two decimal places and a euro sign.
 *
 * @param amount - The amount to format, or null (defaults to 0)
 * @returns The formatted string (e.g. "12.50€")
 */
export const formatNumber = (amount: number | null): string => {
  return `${(amount ?? 0).toFixed(2)}€`;
};

/**
 * Validates whether a string is a valid date in ISO 8601 format.
 *
 * @param dateString - The date string to validate
 * @returns `true` if the string represents a valid date, `false` otherwise
 */
export const validateDateString = (dateString: string): boolean => {
  return dayjs.utc(dateString.trim()).isValid();
};

/**
 * Formats a date string for use in datetime-local inputs.
 * If no date string is provided, defaults to the current local date and time.
 *
 * @param dateString - An optional ISO 8601 date string
 * @returns The formatted date string (e.g. "2026-05-21 14:30")
 */
export const formatDateString = (dateString?: string): string => {
  const date: dayjs.Dayjs = dateString ? dayjs.utc(dateString.trim()) : dayjs();
  return date.format('YYYY-MM-DD HH:mm');
};
