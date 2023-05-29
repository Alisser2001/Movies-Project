import { Controller, Get, Param, Query } from '@nestjs/common';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
    constructor(private serieServices: SeriesService){}
    @Get("all/:name")
    getSerieByName(@Param("name") name: string){
        return this.serieServices.getSerieByName(name);
    }

    @Get("all")
    getAllSeries(){
        return this.serieServices.getAllSeries();
    }

    @Get("genres")
    getMoviesByGenre(@Query("g") genres: any){
        return this.serieServices.getSeriesByGenre(genres.split(", "));
    }

    @Get("serie/:imdbid")
    getSerieByImdbId(@Param("imdbid") imdbid: string){
        return this.serieServices.getSerieByImdbId(imdbid);
    }
}
