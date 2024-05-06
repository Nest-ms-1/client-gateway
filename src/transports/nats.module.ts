import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { NAST_SERVICE, envs } from 'src/config'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NAST_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.nastsServers,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: NAST_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.nastsServers,
        },
      },
    ]),
  ],
})
export class NatsModule {}
