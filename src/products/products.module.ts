import { Module } from '@nestjs/common'
import { NatsModule } from 'src/transports/nats.module'
import { ProductsController } from './products.controller'

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    NatsModule,
    // ClientsModule.register([
    //   {
    //     name: NAST_SERVICE,
    //     transport: Transport.NATS,
    //     options: envs.nastsServers,
    //   },
    // ]),
  ],
})
export class ProductsModule {}
