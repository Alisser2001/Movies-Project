import { Global, Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { HttpModule } from "@nestjs/axios";

@Global()
@Module({
  imports: [HttpModule],
  providers: [ProvidersService],
  exports: [ProvidersService, HttpModule]
})
export class ProvidersModule {}
