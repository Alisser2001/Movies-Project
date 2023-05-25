import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private movieServices: MoviesService){}
    @Get("all/:name")
    getMovieByName(@Param("name") name: string){
        return this.movieServices.getMovieByName(name);
    }
    
    @Get("all")
    getAllMovies(){
        return this.movieServices.getAllMovies();
    }

    @Get("genres")
    getMoviesByGenre(@Query("g") genres: any){
        return this.movieServices.getMoviesByGenre(genres.split(", "));
    }

    @Get("movie/:imdbid")
    getMovieByImdbId(@Param("imdbid") imdbid: string){
        return this.movieServices.getMovieByImdbId(imdbid);
    }
}
