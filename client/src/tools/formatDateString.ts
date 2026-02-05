
/**
 * Formats a date string into a human-readable format (YYYY-MM-DD HH:mm).
 *
 * @param dateString - The date string to format (ISO 8601 format or any valid date string)
 * @returns A formatted date string in the format "YYYY-MM-DD HH:mm"
 *
 * @example
 * ```ts
 * formatDate("2024-01-15T14:30:00.000Z");
 * // Returns: "2024-01-15 14:30"
 * ```
 */
export const formatDateString = (dateString: string): string => {
  return new Date(dateString).toISOString().slice(0, 16).replace('T', ' ');
};
