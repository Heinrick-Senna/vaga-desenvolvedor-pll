import { BadRequestException, Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './dto/transaction.dto';
import { JwtGuard } from 'src/user/guards/jwt.guard';

@Controller('transaction')
export class TransactionsController {
  constructor(
    private transactionService: TransactionsService,
  ) { }

  @UseGuards(JwtGuard)
  @Post('withdraw')
  async withdraw(@Request() req: Request, @Body() { amount }: TransactionDto) {
    const { id } = req['user'];
    return this.transactionService.createTransaction({
      userId: id,
      transactionValue: amount,
      type: 'WITHDRAW'
    });
  }

  @UseGuards(JwtGuard)
  @Post('deposit')
  async deposit(@Request() req: Request, @Body() { amount }: TransactionDto) {
    const { id } = req['user'];
    return this.transactionService.createTransaction({
      userId: id,
      transactionValue: amount,
      type: 'DEPOSIT'
    });
  }

  @UseGuards(JwtGuard)
  @Get('list')
  async getTransactions(@Request() req: Request, @Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    const { id } = req['user'];

    // As datas precisam ser no formato ISO-8601
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    if (startDate && isNaN(start.getTime())) throw new BadRequestException('Invalid startDate format');
    if (endDate && isNaN(end.getTime())) throw new BadRequestException('Invalid endDate format');

    return this.transactionService.listTransactions({
      userId: id,
      start: start,
      end: end,
    })
  }
}
