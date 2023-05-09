import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from "./location.entity";
import { Character } from '../character/character.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character, Location])
  ],
  providers: [LocationService],
  controllers: [LocationController]
})
export class LocationModule {}
