import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Movies } from 'src/movies/movies.entity';
import { Series } from 'src/series/series.entity';
import { MoviesModule } from 'src/movies/movies.module';
import { MoviesService } from 'src/movies/movies.service';
import { SeriesModule } from 'src/series/series.module';
import { SeriesService } from 'src/series/series.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Movies, Series]),
    MoviesModule,
    SeriesModule
  ],
  controllers: [UsersController],
  providers: [UsersService, MoviesService, SeriesService]
})
export class UsersModule {}
