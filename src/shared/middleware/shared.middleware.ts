import { NextFunction, Request, Response } from "express";
import passport from "passport";

import { UserEntity } from "../../user/entities/user.entity";
import { RoleType } from "../../user/types/user.type";
import { HttpResponse } from "../response/http.response";

export class SharedMiddleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}

  passAuth(type: string) {
    // * No guarda la sesión ya que usa cookies
    return passport.authenticate(type, { session: false });
  }

  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;

    if (user.role !== RoleType.ADMIN) {
      return this.httpResponse.UNAUTHORIZED(res, null);
    }

    next();
  }
}
