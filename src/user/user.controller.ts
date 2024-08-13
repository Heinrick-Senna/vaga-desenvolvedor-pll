import { Controller, Get, NotFoundException, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from './guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getUserProfile(@Request() req:Request) {
    const { id } = req['user'];

    const user = await this.userService.findById(id);

    const { password, ...userToReturn } = user;
    return userToReturn;
  }
}
