import { Request, Response } from "express";

import { logger } from "../utils/logger";
import UserService from "./user.service";

class UserController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly userService: UserService = new UserService()) {}

  /**
   *
   * @param _req
   * @param res
   * @returns
   */
  public getAllUsers = async (_req: Request, res: Response) => {
    // * Identificamos cual controller y método se ejecuta
    logger.info(`${UserController.name} - getAllUsers 🦁`);
    const usersResponse = await this.userService.getAllUsers();

    return res.json({
      ok: true,
      users: usersResponse,
      message: "List of users",
    });
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public getUserById = async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    logger.info(`${UserController.name} - getUserById - id: ${userId} 🦁`);
    const user = await this.userService.getUserById(userId);

    return res.json({
      ok: true,
      user,
      message: `User's detail - ${userId}`,
    });
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public createUser = async (req: Request, res: Response) => {
    const { body: userBody } = req;
    logger.info(`${UserController.name} - createUser 🦁`);
    const { email } = userBody;
    const newUser = await this.userService.createUser(userBody);

    return res.json({
      ok: true,
      user: newUser,
      message: `User succesfully created with email: ${email}`,
    });
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public updateUserById = async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    const { body: userBody } = req;
    logger.info(`${UserController.name} - updateUserById - id: ${userId} 🦁`);
    const updatedUser = await this.userService.updateUserById(userId, userBody);

    return res.json({
      ok: true,
      message: `User succesfully updated - ${userId}`,
      user: updatedUser,
    });
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public deleteUserById = async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    logger.info(`${UserController.name} - deleteUserById - id: ${userId} 🦁`);
    const deletedUser = await this.userService.deleteUserById(userId);

    return res.json({
      ok: true,
      user: deletedUser,
      message: `User succesfully deleted - ${userId}`,
    });
  };
}

export default UserController;
