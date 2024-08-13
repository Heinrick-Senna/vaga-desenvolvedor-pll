import { Body, Controller, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from 'src/user/guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ){}

  @Post('register')
  async createRegisterUser(@Body() dto:CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post('login')
  async login(@Body() dto:LoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refresh(@Request() req:Request) {
    const { id } = req['user'];
    if (!id) throw new UnauthorizedException();

    return this.authService.refreshToken(id);
  }

}