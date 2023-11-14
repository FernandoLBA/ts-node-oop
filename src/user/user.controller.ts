import { Request, Response } from "express";
import { logger } from "../utils/logger";

class UserController {
  constructor() {}

  /**
   *
   * @param _req
   * @param res
   * @returns
   */
  public getAllUsers = async (_req: Request, res: Response) => {
    // * Identificamos cual controller y método se ejecuta
    logger.info(`${UserController.name} - getAllUsers 🦁`);

    return res.json({
      ok: true,
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

    return res.json({
      ok: true,
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
    console.log(
      "🚀 ~ file: user.controller.ts:50 ~ UserController ~ createUser= ~ userBody:",
      userBody
    );

    const { email } = userBody;

    return res.json({
      ok: true,
      message: `User succesfully created with email: ${email}`,
      data: userBody,
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
    console.log(
      "🚀 ~ file: user.controller.ts:70 ~ UserController ~ updateUserById= ~ userBody:",
      userBody
    );

    return res.json({
      ok: true,
      message: `User succesfully updated - ${userId}`,
      data: userBody,
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

    return res.json({
      ok: true,
      message: `User succesfully deleted - ${userId}`,
    });
  };
}

export default UserController;
