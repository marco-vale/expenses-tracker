import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const validateDateString = (dateString: string): boolean => {
  return dayjs.utc(dateString.trim()).isValid()
};

export const parseDateString = (dateString: string): Date => {
  return dayjs.utc(dateString.trim()).toDate();
};

export const convertDateToString = (date: Date): string => {
  return dayjs(date).toISOString();
};
