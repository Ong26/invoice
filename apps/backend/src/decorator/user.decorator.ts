import { createParamDecorator, ExecutionContext } from '@nestjs/common';
type JwtPayload = {
  id: string;
  username: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};
export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user || null;
  },
);
