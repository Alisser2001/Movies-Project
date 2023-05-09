import { Controller, Get } from '@nestjs/common';
import { EpisodeService } from './episode.service';

@Controller('episode')
export class EpisodeController {
    constructor(private episodeServices: EpisodeService){}
    @Get("all")
    getAllEpisodes(){
        return this.episodeServices.getAllEpisodes();
    }
}
