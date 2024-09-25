import { LoginUserDto } from '@/dtos/auth/local-user.dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description:
      'Login successfully. You will have an access token valid for one day',
  })
  async login(
    @Body() data: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = data;
    const isCredentialTrue = await this.authService.validateUser(
      email,
      password,
    );
    const user = await this.userService.findOne(email);
    if (!isCredentialTrue) {
      throw new HttpException('Invalid Credential', 401);
    }
    const jwt = await this.authService.generateJwt({
      id: user.id,
      email: user.email,
      username: user.username,
      role: 'STAFF',
    });
    res.cookie('access-token', jwt, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    return { accessToken: jwt };
  }
  @Post('logut')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access-token');
    return { message: 'Logout successfully' };
  }
}
