import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '@App/common/auth/roles.decorator';
import { Role } from '@App/common/auth/roles.enum';
import { JwtAuthGuard } from '@App/modules/shared/guards/jwt-auth.guard';
import { RolesGuard } from '@App/modules/shared/guards/roles.guard';
import { UserCreateDto } from '../dto/user-create.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() data: UserCreateDto) {
    return this.usersService.create(data);
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll() {
    return this.usersService.findAll();
  }

  @Post('/accept-use-terms')
  @Roles(Role.CUSTOMER)
  @HttpCode(HttpStatus.OK)
  async acceptUseTerms(@Request() req) {
    return this.usersService.update(req.user.sub, {
      acceptedUseTerms: new Date(),
    });
  }
}
