export const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.trim().split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
};
