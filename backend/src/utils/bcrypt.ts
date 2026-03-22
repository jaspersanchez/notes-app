import bcrypt from "bcrypt";

export const hashValue = (value: string) => bcrypt.hash(value, 10);

export const compareValue = (entered: string, hashedValue: string) =>
  bcrypt.compare(entered, hashedValue);
