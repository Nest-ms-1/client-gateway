import { IsEnum, IsOptional } from 'class-validator'
import { PaginationDto } from 'src/common'
import { OrderStatus, OrderStatusList } from '../enum/order.enum'

export class OrderPagintationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatus, { message: `Possible values are ${OrderStatusList}` })
  status: OrderStatus
}
