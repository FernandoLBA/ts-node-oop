import { Router } from "express";

import { AuthController } from "../auth/controller/auth.controller";
import { SharedMiddleware } from "../shared/middleware/shared.middleware";
import { BaseRouter } from "../shared/router/base.router";

class AuthRoutes extends BaseRouter<AuthController, SharedMiddleware> {
  public path = "/login";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    super(AuthController, SharedMiddleware);
    this.initAuthRoutes();
  }

  public initAuthRoutes() {
    this.router.post(this.path, this.middleware.passAuth("login"), this.authController.login);
  }
}

export default AuthRoutes;
