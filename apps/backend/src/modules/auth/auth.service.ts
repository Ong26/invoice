import { User } from '@invoice/types/src/user';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.userService.findOneWithPassword(email);
    return user && UserService.comparePassword(password, user.password);
  }
  async generateJwt(user: Pick<User, 'id' | 'username' | 'email' | 'role'>) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: 'STAFF',
    };
    return sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }
}
