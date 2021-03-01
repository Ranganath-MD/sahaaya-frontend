// eslint-disable-next-line no-useless-escape
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const isValidEmailRegex = (email: string) => {
  if(email !== "" && emailRegex.test(email)) return true;
  return false;
};