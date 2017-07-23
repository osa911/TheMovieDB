import LIVR from 'livr';

LIVR.Validator.defaultAutoTrim(true);

const loginSchema = {
  name: ['required', 'string', { min_length: 3 }],
  password: ['required', 'string', { min_length: 5 }],
};
export const loginValidator = new LIVR.Validator(loginSchema);
