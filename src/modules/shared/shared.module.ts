import { Global, Module } from '@nestjs/common';

import { RolesGuard } from './guards/roles.guard';
import { AuthContextService } from './services/auth.context';
import { ConfigService } from './services/config.service';

@Global()
@Module({
  providers: [ConfigService, AuthContextService, RolesGuard],
  exports: [ConfigService, AuthContextService],
})
export class SharedModule {}
