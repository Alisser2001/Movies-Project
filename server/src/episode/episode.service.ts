import { Injectable } from '@nestjs/common';
import { ProvidersService } from 'src/providers/providers.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './episode.entity';
import { Episodes } from './interfaces';

@Injectable()
export class EpisodeService {
    constructor(
        @InjectRepository(Episode) private epRepo: Repository<Episode>,
        private readonly httpService: ProvidersService
    ){}

    async getAllEpisodes(page: number = 1){
        const response = await this.httpService.getPagesEpisodes();
        const pages: number = response;
        if(page > pages) return await this.httpService.getAllEpisodes(pages);
        const ep = await this.httpService.getAllEpisodes(page);
        for(let i=0; i<ep.length; i++){
            await this.createEpisode(ep[i])
        }
        return this.epRepo.find({
            relations: {
                characters: true
            }
        });
    }

    private async createEpisode(body: Episodes){
        try{
            const newEp = await this.epRepo.create({
                id: body.id,
                name: body.name,
                air_date: body.air_date,
                episode: body.episode,
            });
            return this.epRepo.save(newEp);
        }catch(e){
            throw new Error("Something went wrong");
        }
    }
}
