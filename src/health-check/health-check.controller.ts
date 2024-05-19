import { Controller, Get } from '@nestjs/common'

@Controller('/')
export class HealthCheckController {
  @Get()
  healthCheck() {
    return 'client client-gateway is up and running!'
  }
}
