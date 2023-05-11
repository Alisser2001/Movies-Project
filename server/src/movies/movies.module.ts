import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { ProvidersService } from 'src/providers/providers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from 'src/providers/providers.module';
import { Movies } from './movies.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movies]),
    ProvidersModule
  ],
  providers: [MoviesService, ProvidersService],
  controllers: [MoviesController],
})
export class MoviesModule { }
