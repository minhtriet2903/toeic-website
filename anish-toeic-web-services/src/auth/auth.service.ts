import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthenticatedResponse, LoginDto } from './dto/login.dto';
import { validatePassword } from './helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithGoogle(email: string): Promise<AuthenticatedResponse> {
    let user = await this.userService.findByEmail(email);
    if (!user) {
      user = await this.userService.create({ email: email, name: email });
    }
    return { accessToken: await this.generateJWT(user), user: user };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmailForAuthentication(
      loginDto.email,
    );

    if (user && (await validatePassword(loginDto.password, user.password))) {
      return {
        accessToken: await this.generateJWT(user),
        user: { ...user, password: undefined },
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async generateJWT(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userService.findByEmail(payload.email);

      if (!user) throw new UnauthorizedException('User not found');

      return { user };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
