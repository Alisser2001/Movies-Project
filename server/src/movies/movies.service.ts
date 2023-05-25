import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvidersService } from 'src/providers/providers.service';
import { Movies } from './movies.entity';
import { Repository } from 'typeorm';
import { Movie } from './interfaces';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movies) private movieRepo: Repository<Movies>,
        private readonly httpService: HttpService,
        private readonly providerService: ProvidersService
    ) { }

    async getMovieByName(name: string) {
        const res = await this.providerService.getByName(name, "movie");
        const result = res.Search;
        for (let i = 0; i < result.length; i++) {
            const res = await this.providerService.getByImdbID(result[i].imdbID, "movie");
            await this.createMovie(res);
        }
        return (await this.movieRepo.find()).filter((movie) => movie.title.toLowerCase().includes(name.toLowerCase()));
    }

    async getMovieByImdbId(imdbID: string) {
        const res = await this.providerService.getByImdbID(imdbID, "movie");
        const result = res;
        await this.createMovie(result);
        return (await this.movieRepo.find()).filter((movie) => movie.imdbid === imdbID);
    }

    async getAllMovies() {
        return await this.movieRepo.find();
    }

    async createMovie(body: Movie) {
        try {
            const newMovie = this.movieRepo.create();
            newMovie.imdbid = body.imdbID;
            newMovie.title = body.Title;
            newMovie.year = body.Year;
            newMovie.rated = body.Rated;
            newMovie.released = body.Released;
            newMovie.runtime = body.Runtime;
            newMovie.genre = body.Genre;
            newMovie.director = body.Director;
            newMovie.writer = body.Writer;
            newMovie.actors = body.Actors;
            newMovie.plot = body.Plot;
            newMovie.language = body.Language;
            newMovie.country = body.Country;
            newMovie.awards = body.Awards;
            newMovie.poster = body.Poster;
            newMovie.ratings = body.Ratings;
            newMovie.metascore = body.Metascore;
            newMovie.imdbrating = body.imdbRating;
            newMovie.imdbvotes = body.imdbVotes;
            newMovie.dvd = body.DVD;
            newMovie.boxoffice = body.BoxOffice;
            newMovie.production = body.Production;
            newMovie.website = body.Website;
            return await this.movieRepo.save(newMovie);
        } catch (e) {
            throw new Error(e);
        }
    }
}
