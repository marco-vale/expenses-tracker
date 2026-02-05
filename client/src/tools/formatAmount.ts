
/**
 * Formats a numeric amount as a string with two decimal places and Euro symbol.
 * 
 * @param amount - The numeric amount to format
 * @returns A formatted string with the amount followed by the Euro symbol (e.g., "10.50€")
 * 
 * @example
 * ```ts
 * formatAmount(10.5); // Returns "10.50€"
 * formatAmount(100); // Returns "100.00€"
 * ```
 */
export const formatAmount = (amount: number): string => {
  return `${amount.toFixed(2)}€`;
};
