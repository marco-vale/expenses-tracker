export const parseNumber = (numberString?: string): number => {
  if (!numberString || !numberString.trim()) {
    return 0;
  }

  return Number(numberString.trim().replace(/\./g, '').replace(',', '.')) || 0;
};
