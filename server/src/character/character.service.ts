import { Injectable } from '@nestjs/common';
import { ProvidersService } from 'src/providers/providers.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { Location } from 'src/location/location.entity';
import { Characters } from './interfaces';

@Injectable()
export class CharacterService {
    constructor(
        @InjectRepository(Character) private charRepo: Repository<Character>,
        @InjectRepository(Location) private locRepo: Repository<Location>,
        private readonly httpService: ProvidersService
    ){}

    async getAllCharacters(page: number = 1){
        const response = await this.httpService.getPagesChars();
        const pages: number = response;
        if(page > pages) return await this.httpService.getAllChars(pages);
        const chars = await this.httpService.getAllChars(page);
        for(let i=0; i<chars.length; i++){
            await this.createCharacter(chars[i]);
        }
        return this.charRepo.find({
            relations: {
                location: true,
                episodes: true
            }
        });
    }

    private async createCharacter(body: Characters){
        try{
            const idLoc = (body.location.url.split("")[body.location.url.split("/").length - 1] as unknown) as number;
            const locations = await this.locRepo.find();
            const location = locations.filter((loc)=>loc.id == idLoc);
            const newChar = await this.charRepo.create({
                id: body.id,
                name: body.name,
                status: body.status,
                species: body.species,
                type: body.type,
                gender: body.gender,
                origin: body.origin.name,
                img: body.image
            });
            console.log(location)
            return this.charRepo.save(newChar);
        }catch(e){
            throw new Error("Something went wrong");
        }
    }
}
