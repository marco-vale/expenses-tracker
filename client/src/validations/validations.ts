import * as Yup from 'yup';
import { parseNumberString, validateDateString } from '../tools/tools';

export const yupNumberValidation = Yup.string()
  .test('is-number', 'Number must be valid', (value) => {
    return value ? !isNaN(parseNumberString(value)) : true;
  })

export const yupNumberPositiveValidation = Yup.string()
  .test('is-positive', 'Number must be positive', (value) => {
    return value ? parseNumberString(value) > 0 : true;
  });

export const yupNumberPositiveOrZeroValidation = Yup.string()
  .test('is-positive-or-zero', 'Number must be positive or 0', (value) => {
    return value ? parseNumberString(value) >= 0 : true;
  });

export const yupDateValidation = Yup.string()
  .test('is-date', 'Date must be in a valid format', (value) => {
    return value ? validateDateString(value) : true;
  });
