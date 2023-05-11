import { Injectable } from '@nestjs/common';
import { ProvidersService } from 'src/providers/providers.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { Location } from 'src/location/location.entity';
import { Episode } from 'src/episode/episode.entity';
import { Characters } from './interfaces';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CharacterService {
    constructor(
        @InjectRepository(Character) private charRepo: Repository<Character>,
        @InjectRepository(Location) private locRepo: Repository<Location>,
        @InjectRepository(Episode) private epRepo: Repository<Episode>,
        private readonly httpService: HttpService,
        private readonly providerService: ProvidersService
    ) { }

    async getAllCharacters(page: number = 1) {
        const response = await this.providerService.getPagesChars();
        const pages: number = response;
        if (page > pages) return await this.providerService.getAllChars(pages);
        const chars = await this.providerService.getAllChars(page);
        for (let i = 0; i < chars.length; i++) {
            await this.createCharacter(chars[i]);
        }
        return this.charRepo.find({
            relations: {
                location: true,
                episodes: true
            }
        });
    }

    private async createCharacter(body: Characters) {
        try {
            //Location to Character
            const idLoc = (body.location.url.split("/")[body.location.url.split("/").length - 1] as unknown) as number;
            const locations = await this.locRepo.find();
            const location = locations.filter((loc) => loc.id == idLoc);
            const newChar = this.charRepo.create({
                id: body.id,
                name: body.name,
                status: body.status,
                species: body.species,
                type: body.type,
                gender: body.gender,
                origin: body.origin.name,
                img: body.image
            });
            if (location.length > 0) {
                newChar.location = location[0];
            } else {
                const res = await firstValueFrom(this.httpService.get("https://rickandmortyapi.com/api/location/" + idLoc));
                const dataLoc = res.data;
                const newLoc = dataLoc.name ?? this.locRepo.create({
                    id: dataLoc.id,
                    name: dataLoc.name,
                    type: dataLoc.type,
                    dimension: dataLoc.dimension,
                });
                await this.locRepo.save(newLoc);
                newChar.location = newLoc;
            }

            //Episodes to Character
            const episodesApi = body.episode;
            const episodesDb = await this.epRepo.find();
            for (let i = 0; i < episodesApi.length; i++) {
                const idEp = (episodesApi[i].split("/")[episodesApi[i].split("/").length - 1] as unknown) as number;
                const episode = episodesDb.filter((ep) => ep.id == idEp);
                if (episode.length > 0) {
                    if(newChar.episodes === undefined) {
                        newChar.episodes = [episode[0]]
                    } else {
                        newChar.episodes.push(episode[0])
                    }
                } else {
                    const res = await firstValueFrom(this.httpService.get("https://rickandmortyapi.com/api/episode/" + idEp));
                    const dataEp = res.data;
                    const newEp = this.epRepo.create({
                        id: dataEp.id,
                        name: dataEp.name,
                        air_date: dataEp.air_date,
                        episode: dataEp.episode
                    })
                    await this.epRepo.save(newEp);
                    newChar.episodes.push(newEp);
                }
            }
            return this.charRepo.save(newChar);
        } catch (e) {
            throw new Error(e);
        }
    }
}
