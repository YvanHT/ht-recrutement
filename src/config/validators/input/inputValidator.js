import pattern from '../../regex/pattern';

/**
 * @param {string} value
 * @param {int} type
 * @return {boolean}
 * 0 => simple string verification
 * 1 => email verification
 * 2 => phone number verification
 */

const inputValidator = (value, type = 0) => {
  let res = false;

  switch (type) {
    case 0:
      res = value.trim().length > 3;
      break;

    case 1:
      res = pattern.email.test(value);
      break;

    case 2:
      res = pattern.phoneNumber.test(value);
      break;

    case 4:
      res = value.trim().length > 1;
      break;

    default:
      res = true;
      break;
  }

  return res;
};

export default inputValidator;
