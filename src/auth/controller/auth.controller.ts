import { Request, Response } from "express";

import { UserEntity } from "../../user/entities/user.entity";
import { logger } from "../../utils/logger";
import { AuthService } from "../services/auth.services";
import { HttpResponse } from "../../shared/response/http.response";

// * Se puede extender AuthService o inyectarla con inyección de dependencias dentro
// * del constructor
export class AuthController extends AuthService {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {
    super();
  }

  async login(req: Request, res: Response) {
    try {
      logger.info(`${AuthController.name} - login 🦁`);
      const userEncode = req.user as UserEntity;
      const encode = await this.generateJwt(userEncode);

      if (!encode) {
        return this.httpResponse.UNAUTHORIZED(res, null);
      }

      res.header("Content-type", "application/json");
      // * nombre de la cookie, valor y opciones (maxAge = tiempo de la cookie)
      res.cookie("accessToken", encode.accessToken, { maxAge: 60000 * 60 });
      res.write(JSON.stringify(encode));
      res.end();
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  }
}
