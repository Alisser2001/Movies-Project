import { Injectable } from '@nestjs/common';
import { ProvidersService } from 'src/providers/providers.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { Locations } from './interfaces';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location) private locRepo: Repository<Location>,
        private readonly httpService: ProvidersService
    ){}

    async getAllLocations(page: number = 1){
        const response = await this.httpService.getPagesLocations();
        const pages: number = response;
        if(page > pages) return await this.httpService.getAllLocations(pages);
        const loc = await this.httpService.getAllLocations(page);
        for(let i=0; i<loc.length; i++){
            await this.createLocation(loc[i])
        }
        return this.locRepo.find();
    }

    private async createLocation(body: Locations){
        try{
            const newLoc = await this.locRepo.create({
                id: body.id,
                name: body.name,
                type: body.type,
                dimension: body.dimension,
            });
            return this.locRepo.save(newLoc);
        }catch(e){
            throw new Error("Something went wrong");
        }
    }
}
