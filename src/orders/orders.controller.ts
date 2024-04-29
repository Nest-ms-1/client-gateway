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
import { ORDER_SERVICE } from 'src/config'
import { CreateOrderDto, OrderPagintationDto, StatusDto } from './dto'
import { PaginationDto } from 'src/common'

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly ordersService: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.send('create_order', createOrderDto)
  }

  @Get()
  findAll(@Query() orderPagintationDto: OrderPagintationDto) {
    return this.ordersService.send('find_all_orders', orderPagintationDto)
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.send('find_one_order', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err)
      })
    )
  }
  @Get(':status')
  findAllByStatus(@Param() statusDto: StatusDto, @Query() paginationDto: PaginationDto) {
    return this.ordersService.send('find_all_orders', {
      ...paginationDto,
      status: statusDto.status,
    })
  }

  @Patch(':id')
  changeStatus(@Param('id', ParseUUIDPipe) id: string, @Body() statusDto: StatusDto) {
    return this.ordersService.send('change-order-status', { id, status: statusDto.status })
  }
}
