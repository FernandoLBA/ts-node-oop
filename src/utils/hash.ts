import bcrypt from "bcrypt";

/**
 * Esta función recibe un string
 * y retorna el string hasheado.
 * @param value
 * @returns
 */
export const createHashValue = async (value: string) => {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hashSync(value, salt);
};

/**
 * Esta función compara si la password o el texto plano
 * coincide con el texto hasheado.
 * Esta función recibe una string en texto plano
 * y otro string hasheado, retorna true si coinciden
 * y fase si no.
 * @param pwd
 * @param encriptedPwd
 * @returns
 */
export const isValidPassword = async (pwd: string, encriptedPwd: string) => {
  return await bcrypt.compareSync(pwd, encriptedPwd);
};
