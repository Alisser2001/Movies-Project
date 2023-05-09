import { Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { ProvidersModule } from 'src/providers/providers.module';
import { ProvidersService } from 'src/providers/providers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './episode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Episode]),
    ProvidersModule
  ],
  providers: [EpisodeService, ProvidersService],
  controllers: [EpisodeController]
})
export class EpisodeModule {}
