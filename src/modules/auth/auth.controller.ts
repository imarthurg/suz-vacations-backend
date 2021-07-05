import { Body, Controller, HttpCode, Post, Request, UseGuards, HttpStatus } from '@nestjs/common';

import { LocalAuthGuard } from '@App/modules/shared/guards/local-auth.guard';
import { JwtAuthGuard } from '@App/modules/shared/guards/jwt-auth.guard';
import { Roles } from '@App/common/auth/roles.decorator';
import { Role } from '@App/common/auth/roles.enum';
import { RolesGuard } from '@App/modules/shared/guards/roles.guard';
import { AuthService } from './auth.service';
import { RecoverPasswordDto } from './dto/recover-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Post('/profile')
  async profile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Post('/recover-password')
  @HttpCode(HttpStatus.OK)
  async recoverPassword(@Body() data: RecoverPasswordDto) {
    return this.authService.recoverPassword(data.email);
  }
}
