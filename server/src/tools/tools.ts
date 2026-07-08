import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

/**
 * Validates whether a string is a valid date in ISO 8601 format.
 *
 * @param dateString - The date string to validate
 * @returns `true` if the string represents a valid date, `false` otherwise
 */
export const validateDateString = (dateString: string): boolean => {
  return dayjs.utc(dateString.trim()).isValid()
};

/**
 * Parses an ISO 8601 date string into a UTC Date object.
 *
 * @param dateString - A date string in ISO 8601 format (e.g. "2026-05-20T14:30:00.000Z")
 * @returns A Date object representing the parsed UTC date
 */
export const parseDateString = (dateString: string): Date => {
  return dayjs.utc(dateString.trim()).toDate();
};

/**
 * Converts a Date object to an ISO 8601 string.
 *
 * @param date - The Date object to convert
 * @returns The ISO 8601 formatted string (e.g. "2026-05-20T14:30:00.000Z")
 */
export const convertDateToString = (date: Date): string => {
  return dayjs(date).toISOString();
};
