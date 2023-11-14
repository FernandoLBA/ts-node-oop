import { Router } from "express";

import { Routes } from "../interfaces/route.interface";
import UserController from "../user/user.controller";

class UserRoutes implements Routes {
  public path = "/user";
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initUserRoute();
  }

  /**
   * Rutas de User
   */
  public initUserRoute() {
    // * Get all users
    this.router.get(`${this.path}s`, this.userController.getAllUsers);

    // * Get user by Id
    this.router.get(`${this.path}/:id`, this.userController.getUserById);

    // * Create user
    this.router.post(`${this.path}`, this.userController.createUser);

    // * Update user by Id
    this.router.put(`${this.path}/:id`, this.userController.updateUserById);

    // * Delete user by Id
    this.router.delete(`${this.path}/:id`, this.userController.deleteUserById);
  }
}

export default UserRoutes;
