import { NextFunction, Request, Response, Router } from "express";

import { BaseRouter } from "../shared/router/base.router";
import UserController from "../user/controllers/user.controller";
import { ValidateMiddlewareDTO } from "../shared/middleware/validate-dto.middleware";
import { UserDTO } from "../user/dto/user.dto";

class UserRoutes extends BaseRouter<UserController, ValidateMiddlewareDTO> {
  public path = "/user";
  public router = Router();
  public userController = new UserController();

  constructor() {
    super(UserController, ValidateMiddlewareDTO);
    this.initUserRoute();
  }

  /**
   * Rutas de User
   */
  public initUserRoute() {
    // * Get all users
    this.router.get(`${this.path}s`, this.middleware.passAuth("jwt"), this.userController.getAllUsers);

    // * Get user by Id
    this.router.get(`${this.path}/:id`, this.middleware.passAuth("jwt"), this.userController.getUserById);

    // * Get user by Id with Customer Relation
    this.router.get(
      `${this.path}/rel/:id`,
      this.middleware.passAuth("jwt"),
      this.userController.getUserByIdWithCustomerRelation,
    );

    // * Create user
    this.router.post(
      `${this.path}`,
      // * Aquí se colocará un array de middlewares, que se ejecutan a través de esta función
      (req: Request, res: Response, next: NextFunction) => [this.middleware.validator(req, res, next, UserDTO)],
      this.userController.createUser,
    );

    // * Update user by Id
    this.router.put(
      `${this.path}/:id`,
      this.middleware.passAuth("jwt"),
      (req: Request, res: Response, next: NextFunction) => [this.middleware.checkAdminRole(req, res, next)],
      this.userController.updateUserById,
    );

    // * Delete user by Id
    this.router.delete(
      `${this.path}/:id`,
      this.middleware.passAuth("jwt"),
      (req: Request, res: Response, next: NextFunction) => [this.middleware.checkAdminRole(req, res, next)],
      this.userController.deleteUserById,
    );
  }
}

export default UserRoutes;
