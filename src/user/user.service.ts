import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        document: dto.document
      }
    })

    if (user) throw new ConflictException("Document already on use!");

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        value: 2000, //Crédito pré-aprovado do cliente
        password: await hash(dto.password, 10)
      }
    });

    const { password, ...result } = newUser;
    return result;
  }

  async findByDocument(document: string) {
    if (!document) throw new UnauthorizedException();

    const user = await this.prisma.user.findUnique({
      where: {
        document: document
      }
    })
    
    if (!user) throw new NotFoundException();
    
    return user; 
  }

  async findById(id: number) {
    if (!id) throw new UnauthorizedException();

    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    });

    if (!user) throw new NotFoundException();

    return user;
  }
}
