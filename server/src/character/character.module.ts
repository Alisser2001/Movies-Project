import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { ProvidersModule } from 'src/providers/providers.module';
import { ProvidersService } from 'src/providers/providers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { Location } from 'src/location/location.entity';
import { Episode } from 'src/episode/episode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character, Location, Episode]),
    ProvidersModule
  ],
  providers: [CharacterService, ProvidersService],
  controllers: [CharacterController]
})
export class CharacterModule {}
