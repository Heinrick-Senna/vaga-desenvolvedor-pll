import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface IUserPayload {
  id: number
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}  

  async login(dto:LoginDto) {
    const user = await this.validateUser(dto);

    return {
      user,
      backendTokens: await this.createTokens(user.id) 
    }
  }

  async validateUser(dto:LoginDto) {
    const user = await this.userService.findByDocument(dto.document);

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    if (await compare(dto.password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Senha incorreta.');
  }

  async refreshToken(id:number) {
    return await this.createTokens(id);
  }

  private async createTokens(id:number) {
    const payload:IUserPayload = { id }

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: process.env.JWT_ACCESS_SECRET
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: process.env.JWT_REFRESH_SECRET
      }),
    }
  }
}
