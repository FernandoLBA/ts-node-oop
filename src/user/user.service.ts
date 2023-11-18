import { UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { logger } from "../utils/logger";
import { UserEntity } from "./entities/user.entity";
import { UserDTO } from "./dto/user.dto";

class UserService extends BaseService<UserEntity> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    // * La clase BaseService recibe la entidad al cual se conectará
    super(UserEntity);
  }

  /**
   * getAllUsers
   */
  public async getAllUsers(): Promise<UserEntity[]> {
    // * retorna el nombre de la clase y el nombre del método
    logger.info(`${UserService.name} - getAllUsers 🦌`);

    // * Acá comenzamos a usar el repositorio devuelto de la clase BaseService
    // * el cual nos dará acceso a los métodos del repositorio
    const users = await (await this.useRepository).find();

    return users;
  }

  /**
   * getUserById
   * @param id
   * @returns
   */
  public async getUserById(id: string): Promise<UserEntity | null> {
    logger.info(`${UserService.name} - getUserById - id: ${id} 🦌`);
    const user = await (await this.useRepository).findOneBy({ id });

    if (!user) {
      // TODO: agregar o retornar error
      console.log("Error no se encontro el usuario");
    }

    return user;
  }

  /**
   * createUser
   * @param userBody
   * @returns
   */
  public async createUser(userBody: UserDTO) {
    logger.info(`${UserService.name} - createUser 🦌`);
    console.log("🚀 ~ file: user.service.ts:39 ~ UserService ~ createUser ~ userBody:", userBody);
    const newUser = await (await this.useRepository).create(userBody);

    return (await this.useRepository).save(newUser);
  }

  /**
   * updateUserById
   * @param id
   * @param userBody
   * @returns
   */
  public async updateUserById(id: string, userBody: any): Promise<UpdateResult | null> {
    logger.info(`${UserService.name} - updateUserById - id: ${id} 🦌`);
    console.log("🚀 ~ file: user.service.ts:55 ~ UserService ~ updateUserById ~ userBody:", userBody);
    const findUser = await (await this.useRepository).findOneBy({ id });

    if (!findUser) {
      // TODO: agregar o retornar un error
      console.log("El usuario no existe");
    }

    return await (await this.useRepository).update(id, { ...userBody });
  }

  public async deleteUserById(id: string) {
    logger.info(`${UserService.name} - deleteUserById - id: ${id} 🦌`);
    const findUser = await (await this.useRepository).findOneBy({ id });

    if (!findUser) {
      // TODO: agregar o retornar un error
      console.log("El usuario no existe");
    }

    return await (await this.useRepository).delete(id);
  }
}

export default UserService;
