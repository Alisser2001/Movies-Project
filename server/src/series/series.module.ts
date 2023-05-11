import { Module } from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from 'src/providers/providers.module';
import { Series } from './series.entity';
import { ProvidersService } from 'src/providers/providers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Series]),
    ProvidersModule
  ],
  providers: [SeriesService, ProvidersService],
  controllers: [SeriesController]
})
export class SeriesModule { }
