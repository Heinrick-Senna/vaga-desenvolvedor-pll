import { ForbiddenException, Injectable } from '@nestjs/common';
import { TransactionType, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

interface ITransactionParameters {
  userId: number,
  transactionValue: number,
  type: TransactionType
}

interface ITransactionList {
  userId: number,
  start?: Date,
  end?: Date
}

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) { }

  async createTransaction({ userId, transactionValue, type }: ITransactionParameters) {
    const { value } = await this.userService.findById(userId);

    let newValue = value;

    if (type == 'DEPOSIT') {
      newValue = value + transactionValue
    }

    if (type == 'WITHDRAW') {
      if (transactionValue > newValue) throw new ForbiddenException("You don't have enough money to do this transaction")
      newValue = value - transactionValue
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        value: newValue,
      },
    });

    return await this.createTransactionLog({ userId, transactionValue, type });
  }

  async createTransactionLog({ userId, transactionValue, type }: ITransactionParameters) {
    return await this.prisma.transaction.create({
      data: {
        value: transactionValue,
        userId,
        type
      }
    })
  }

  async listTransactions({userId, start, end}:ITransactionList) {
    const queryObject: Prisma.TransactionWhereInput = {
      userId: userId,
      date: {}
    }

    if (start) queryObject.date["gte"] = start;
    if (end) queryObject.date["lte"] = end;

    return await this.prisma.transaction.findMany({
      where: queryObject
    })
  }
}
