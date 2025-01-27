import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = 10;
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  providedPass: string,
  storedPass: string,
) => {
  return await bcrypt.compare(providedPass, storedPass);
};
