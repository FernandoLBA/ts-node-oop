import { VerifyFunction, Strategy as LocalStrategy } from "passport-local";

import { UserEntity } from "../../user/entities/user.entity";
import { PassportUse } from "../../utils/passport-use";
import { AuthService } from "../services/auth.services";

export class LoginStrategy {
  constructor(private readonly authService: AuthService = new AuthService()) {}

  public async validate(email: string, password: string, done: any): Promise<UserEntity> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return done(null, false, { message: "Invalid wmail or password" });
    }

    return done(null, user);
  }

  get use() {
    return PassportUse<LocalStrategy, Object, VerifyFunction>(
      "login",
      LocalStrategy,
      {
        usernameField: "email",
        passwordField: "password",
      },
      this.validate,
    );
  }
}
