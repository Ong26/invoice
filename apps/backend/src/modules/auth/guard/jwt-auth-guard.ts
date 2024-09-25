import { JwtUser } from '@invoice/types/src/user';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies['access-token'];
    if (!accessToken) {
      throw new UnauthorizedException('Unauthorized 1');
    }

    try {
      const verifyResult = verify(
        accessToken,
        process.env.JWT_SECRET,
      ) as JwtUser;
      const expires = verifyResult.exp;
      const now = Date.now() / 1000;
      request.user = verifyResult;
      return expires > now;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
