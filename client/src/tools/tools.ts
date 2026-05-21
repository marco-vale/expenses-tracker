import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const parseNumberString = (numberString: string): number => {
  return Number(numberString.trim().replace(',', '.'));
};

export const formatNumber = (amount: number | null): string => {
  return `${(amount ?? 0).toFixed(2)}€`;
};

export const validateDateString = (dateString: string): boolean => {
  return dayjs.utc(dateString.trim()).isValid()
};

export const formatDateString = (dateString?: string): string => {
  return dayjs.utc(dateString?.trim()).format('YYYY-MM-DD HH:mm');
};
