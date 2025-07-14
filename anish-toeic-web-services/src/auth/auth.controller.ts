import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async signIn(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { accessToken, user } = await this.authService.login(loginDto);
    res.cookie('auth_token', accessToken, {
      httpOnly: process.env.NODE_ENV === 'production', // Cookie is not accessible via JavaScript in the browser
      secure: process.env.NODE_ENV === 'production', // Set to true in production (HTTPS)
      // sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none', // Helps prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
    });
    return res.status(HttpStatus.OK).json({ user: user });
  }

  @Public()
  @Post('login/google')
  async signInWithGoogle(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { accessToken, user } = await this.authService.loginWithGoogle(
      loginDto.email,
    );
    res.cookie('auth_token', accessToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      // sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(HttpStatus.OK).json({ user: user });
  }

  @Public()
  @Get('verify-token')
  async verifyToken(
    @Req() req: Request & { cookies: { auth_token?: string } },
    @Res() res: Response,
  ) {
    const token = req.cookies['auth_token'];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const { user } = await this.authService.verifyToken(token);

    return res.status(HttpStatus.OK).json({ user: user });
  }

  @Public()
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('auth_token');
    res.clearCookie('user');
    return res.send({ message: 'Logged out successfully' });
  }
}
