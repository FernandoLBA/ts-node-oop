import { Strategy as JwtStrat, StrategyOptions, ExtractJwt } from "passport-jwt";

import { PayloadToken } from "../interfaces/auth.interface";
import { JWT_SECRET } from "../../config/config";
import { AuthService } from "../services/auth.services";
import { PassportUse } from "../../utils/passport-use";

export class JwtStrategy extends AuthService {
  constructor() {
    super();
  }

  async validate(payload: PayloadToken, done: any) {
    return done(null, payload);
  }

  get use() {
    return PassportUse<JwtStrat, StrategyOptions, (payload: PayloadToken, done: any) => Promise<PayloadToken>>(
      "jwt",
      JwtStrat,
      { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET },
      this.validate,
    );
  }
}
