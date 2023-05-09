import { Module } from '@nestjs/common';
import { CharacterModule } from './character/character.module';
import { ProvidersModule } from './providers/providers.module';
import { LocationModule } from './location/location.module';
import { EpisodeModule } from './episode/episode.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  CharacterModule, 
  ProvidersModule, 
  LocationModule, 
  EpisodeModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
