import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";

import { HttpResponse } from "../../shared/response/http.response";
import { logger } from "../../utils/logger";
import UserService from "../services/user.service";

class UserController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  /**
   *
   * @param _req
   * @param res
   * @returns
   */
  public getAllUsers = async (_req: Request, res: Response) => {
    try {
      // * Identificamos cual controller y método se ejecuta
      logger.info(`${UserController.name} - getAllUsers 🦁`);
      const usersResponse = await this.userService.getAllUsers();

      return this.httpResponse.OK(res, usersResponse);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.INTERNAL_SERVER_ERROR(res, null);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`${UserController.name} - getUserById - id: ${id} 🦁`);
      const user = await this.userService.getUserById(id);

      if (!user) {
        logger.warn(`User with id ${id} not found 🕵️`);
        return this.httpResponse.NOT_FOUND(res, null);
      }

      return this.httpResponse.OK(res, user);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public getUserByIdWithRelation = async (req: Request, res: Response) => {
    try {
      const { uid } = req.params;
      logger.info(`${UserController.name} - getUserByIdWithRelation - uid: ${uid} 🦁`);
      const user = await this.userService.getUserByIdWithRelation(uid);

      if (!user) {
        logger.warn(`User with id ${uid} not found 🕵️`);
        return this.httpResponse.NOT_FOUND(res, null);
      }

      return this.httpResponse.OK(res, user);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public createUser = async (req: Request, res: Response) => {
    try {
      const { body: userBody } = req;
      logger.info(`${UserController.name} - createUser 🦁`);
      const newUser = await this.userService.createUser(userBody);

      return this.httpResponse.OK(res, newUser);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public updateUserById = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      const { body: userBody } = req;
      logger.info(`${UserController.name} - updateUserById - id: ${userId} 🦁`);
      const updatedUser: UpdateResult | undefined = await this.userService.updateUserById(userId, userBody);

      if (!updatedUser) {
        return this.httpResponse.NOT_FOUND(res, null);
      }

      return this.httpResponse.OK(res, updatedUser);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public deleteUserById = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      logger.info(`${UserController.name} - deleteUserById - id: ${userId} 🦁`);
      const deletedUser: DeleteResult | null | undefined = await this.userService.deleteUserById(userId);

      if (deletedUser?.affected === 0) {
        return this.httpResponse.NOT_FOUND(res, null);
      }

      return this.httpResponse.OK(res, deletedUser);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };
}

export default UserController;
