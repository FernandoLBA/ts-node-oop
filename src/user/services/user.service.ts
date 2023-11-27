import { DeleteResult, UpdateResult } from "typeorm";

import { BaseService } from "../../config/base.service";
import { createHashValue } from "../../utils/hash";
import { logger } from "../../utils/logger";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import { HttpException } from "../../exception/httpException";
import { ReasonPhrases } from "http-status-codes";

class UserService extends BaseService<UserEntity> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    // * La clase BaseService recibe la entidad al cual se conectará
    super(UserEntity);
  }

  /**
   * getAllUsers
   */
  public async getAllUsers(): Promise<UserEntity[] | undefined> {
    try {
      // * retorna el nombre de la clase y el nombre del método
      logger.info(`${UserService.name} - getAllUsers 🦌`);

      // * Acá comenzamos a usar el repositorio devuelto de la clase BaseService
      // * el cual nos dará acceso a los métodos del repositorio
      const users = await (await this.useRepository).find();

      return users;
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * getUserById
   * @param id
   * @returns
   */
  public async getUserById(id: string): Promise<UserEntity | null | undefined> {
    try {
      logger.info(`${UserService.name} - getUserById - id: ${id} 🦌`);
      const user = await (await this.useRepository).findOneBy({ id });

      if (!user) {
        throw new HttpException(409, ReasonPhrases.NOT_FOUND);
      }

      return user;
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * getUserByIdWithCustomerRelation
   * @param id
   * @returns
   */
  public async getUserByIdWithCustomerRelation(id: string): Promise<UserEntity | null | undefined> {
    try {
      logger.info(`${UserService.name} - getUserByIdWithCustomerRelation - uid: ${id} 🦌`);
      const user = await (await this.useRepository)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.customer", "customer")
        .where({ id })
        .getOne();

      return user;
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * findUserByEmail
   * @param email
   * @returns
   */
  public async findUserByEmail(email: string): Promise<UserEntity | null | undefined> {
    try {
      logger.info(`${UserService.name} - findUserByEmail - email: ${email} 🦌`);
      const findedUser = await (await this.useRepository)
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where({ email })
        .getOne();

      return findedUser;
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * findUserByName
   * @param name
   * @returns
   */
  public async findUserByName(name: string): Promise<UserEntity | null | undefined> {
    try {
      logger.info(`${UserService.name} - findUserByName - name: ${name} 🦌`);
      const findedUser = await (await this.useRepository)
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where({ name })
        .getOne();

      return findedUser;
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * createUser
   * @param userBody
   * @returns
   */
  public async createUser(userBody: UserDTO): Promise<UserEntity | undefined> {
    try {
      logger.info(`${UserService.name} - createUser 🦌`);
      console.log("🚀 ~ file: user.service.ts:123 ~ UserService ~ createUser ~ userBody:", userBody);
      const hashedPassword = await createHashValue(userBody.password);
      const newUser = (await this.useRepository).create({ ...userBody, password: hashedPassword });

      return (await this.useRepository).save(newUser);
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * updateUserById
   * @param id
   * @param userBody
   * @returns
   */
  public async updateUserById(id: string, userBody: UserDTO): Promise<UpdateResult | undefined> {
    try {
      logger.info(`${UserService.name} - updateUserById - id: ${id} 🦌`);
      console.log("🚀 ~ file: user.service.ts:142 ~ UserService ~ updateUserById ~ userBody:", userBody);
      const findUser = await (await this.useRepository).findOneBy({ id });

      if (!findUser) {
        // TODO: agregar o retornar un error
        console.log("El usuario no existe");
      }

      if (userBody.password) {
        userBody = { ...userBody, password: await createHashValue(userBody.password) };
      }

      return await (await this.useRepository).update(id, { ...userBody });
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * deleteUserById
   * @param id
   * @returns
   */
  public async deleteUserById(id: string): Promise<DeleteResult | null | undefined> {
    try {
      logger.info(`${UserService.name} - deleteUserById - id: ${id} 🦌`);
      const findUser = await (await this.useRepository).findOneBy({ id });

      if (!findUser) {
        // TODO: agregar o retornar un error
        console.log("El usuario no existe");
      }

      return await (await this.useRepository).delete(id);
    } catch (error) {
      logger.error(error);
    }
  }
}

export default UserService;
