import { logger } from "../utils/logger";

class UserService {
  constructor() {}

  /**
   * getAllUsers
   */
  public async getAllUsers() {
    // * retorna el nombre de la clase y el nombre del método
    logger.info(`${UserService.name} - getAllUsers 🦌`);

    const users = [
      { id: 1, fullname: "Fernando Barrios", email: "fbarrios@mail.com" },
    ];

    return users;
  }

  /**
   * getUserById
   * @param id
   * @returns
   */
  public async getUserById(id: string) {
    logger.info(`${UserService.name} - getUserById - id: ${id} 🦌`);

    const user = {
      id: 1,
      fullname: "Fernando Barrios",
      email: "fbarrios@mail.com",
    };

    return user;
  }

  /**
   * createUser
   * @param userBody
   * @returns
   */
  public async createUser(userBody: any) {
    logger.info(`${UserService.name} - createUser 🦌`);
    console.log(
      "🚀 ~ file: user.service.ts:39 ~ UserService ~ createUser ~ userBody:",
      userBody
    );
    const newUser = { ...userBody, id: 2 };

    return newUser;
  }

  /**
   * updateUserById
   * @param id
   * @param userBody
   * @returns
   */
  public async updateUserById(id: string, userBody: any) {
    logger.info(`${UserService.name} - updateUserById - id: ${id} 🦌`);
    console.log(
      "🚀 ~ file: user.service.ts:55 ~ UserService ~ updateUserById ~ userBody:",
      userBody
    );
    const updatedUser = userBody;

    return { id, ...updatedUser };
  }

  public async deleteUserById(id: string) {
    logger.info(`${UserService.name} - deleteUserById - id: ${id} 🦌`);
    const deletedUser = {
      id,
      fullname: "Pedro Pérez",
      email: "pperez@correo.com",
    };

    return deletedUser;
  }
}

export default UserService;
