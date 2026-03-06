export const parseNumber = (numberString: string): number => {
  return Number(numberString.trim().replace(/\./g, '').replace(',', '.')) || 0;
};
