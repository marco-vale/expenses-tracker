import * as Yup from 'yup';
import { validateDateString } from '../tools/tools';

export const yupNumberPositiveOrZeroValidation = Yup.number()
  .test('is-positive-or-zero', 'Starting balance must be positive or 0', (value) => {
    return value ? value >= 0 : true;
  });

export const yupDateValidation = Yup.string()
  .test('is-date', 'Date must be in a valid format', (value) => {
    return value ? validateDateString(value) : true;
  });
