import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { catchError } from 'rxjs'
import { NAST_SERVICE } from 'src/config'
import { CreateOrderDto, OrderPagintationDto, StatusDto } from './dto'
import { PaginationDto } from 'src/common'

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NAST_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('create_order', createOrderDto)
  }

  @Get()
  findAll(@Query() orderPagintationDto: OrderPagintationDto) {
    return this.client.send('find_all_orders', orderPagintationDto).pipe(
      catchError((err) => {
        throw new RpcException(err)
      })
    )
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('find_one_order', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err)
      })
    )
  }
  @Get(':status')
  findAllByStatus(@Param() statusDto: StatusDto, @Query() paginationDto: PaginationDto) {
    return this.client.send('find_all_orders', {
      ...paginationDto,
      status: statusDto.status,
    })
  }

  @Patch(':id')
  changeStatus(@Param('id', ParseUUIDPipe) id: string, @Body() statusDto: StatusDto) {
    return this.client.send('change-order-status', { id, status: statusDto.status })
  }
}
