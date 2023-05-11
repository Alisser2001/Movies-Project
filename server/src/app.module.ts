import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { SeriesModule } from './series/series.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '321724AAa',
    database: 'rymdb',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    retryDelay: 3000,
    retryAttempts: 5
  }),
  ConfigModule.forRoot({
    envFilePath: ".dev.env",
    isGlobal: true
  }),
  ProvidersModule, 
  UsersModule, 
  MoviesModule, 
  SeriesModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
