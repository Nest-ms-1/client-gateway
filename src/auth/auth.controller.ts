import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { NATS_SERVICE } from 'src/config'
import { LoginUserDto, RegisterUserDto } from './dto'
import { catchError } from 'rxjs'
import { AuthGuard } from './guards'
import { User, Token } from './decorators'
import { CurrentUser } from './intertfaces/current-user.interface'

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((error) => {
        throw new RpcException({
          status: 400,
          message: error.message,
        })
      })
    )
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException({
          status: 400,
          message: error.message,
        })
      })
    )
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    return {
      user,
      token,
    }
    // return this.client.send('auth.verify.token', {})
  }
}
