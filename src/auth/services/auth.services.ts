import * as jwt from "jsonwebtoken";

import { JWT_SECRET } from "../../config/config";
import { UserEntity } from "../../user/entities/user.entity";
import UserService from "../../user/services/user.service";
import { isValidPassword } from "../../utils/hash";
import { PayloadToken } from "../interfaces/auth.interface";

export class AuthService {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly jwtInstance = jwt,
  ) {}

  public async validateUser(email: string, password: string): Promise<UserEntity | null> {
    const userByEmail = await this.userService.findUserByEmail(email);

    if (userByEmail && (await isValidPassword(password, userByEmail?.password))) {
      return userByEmail;
    }

    return null;
  }

  public signature(payload: PayloadToken, secret: any) {
    return this.jwtInstance.sign(payload, secret);
  }

  public async generateJwt(user: UserEntity): Promise<{ accessToken: string; user: UserEntity | null | undefined }> {
    const userChecked = await this.userService.findUserWithRole(user.id, user.role);
    const payload: PayloadToken = {
      role: userChecked!.role,
      sub: userChecked!.id,
    };

    if (userChecked) {
      user.password = "You can't see this 🤪";
    }

    return {
      accessToken: this.signature(payload, JWT_SECRET),
      user: userChecked,
    };
  }
}
