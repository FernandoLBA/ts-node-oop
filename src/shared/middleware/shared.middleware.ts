import { NextFunction, Request, Response } from "express";
import passport from "passport";

import { UserEntity } from "../../user/entities/user.entity";
import { RoleType } from "../../user/types/user.type";
import { HttpResponse } from "../response/http.response";

export class SharedMiddleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}

  /**
   * Verifica que este logueado
   * @param type
   * @returns
   */
  passAuth(type: string) {
    console.log("🚀 ~ file: shared.middleware.ts:17 ~ SharedMiddleware ~ passAuth ~ type:", type);
    // * No guarda la sesión ya que usa cookies
    return passport.authenticate(type, { session: false });
  }

  /**
   * Verifica si el rol del usuario es ADMIN
   * @param req
   * @param res
   * @param next
   * @returns
   */
  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;

    if (user.role !== RoleType.ADMIN) {
      console.log("🚀 ~ file: shared.middleware.ts:33 ~ SharedMiddleware ~ checkAdminRole ~ user:", user.role);
      return this.httpResponse.FORBIDDEN(res, null);
    }

    next();
  }
}
