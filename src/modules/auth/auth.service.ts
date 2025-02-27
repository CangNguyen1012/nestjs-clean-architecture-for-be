import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: { username: string; id: number }) {
    const payload = { username: user.username, sub: user.id };
    try {
      const access_token: string = await this.jwtService.signAsync(payload);
      return { access_token };
    } catch (error: any) {
      throw new Error('Error signing the token');
    }
  }
}
