import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Series } from './series.entity';
import { Serie } from './interfaces';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ProvidersService } from 'src/providers/providers.service';

@Injectable()
export class SeriesService {
    constructor(
        @InjectRepository(Series) private serieRepo: Repository<Series>,
        private readonly httpService: HttpService,
        private readonly providerService: ProvidersService
    ) { }

    async getSerieByName(name: string) {
        const res = await this.providerService.getByName(name, "series");
        const result = res.Search;
        for (let i = 0; i < result.length; i++) {
            const res = await this.providerService.getByImdbID(result[i].imdbID, "series");
            await this.createSerie(res);
        }
        return (await this.serieRepo.find()).filter((serie) => serie.title.toLowerCase().includes(name.toLowerCase()));
    }

    async getSeriesByGenre(genres: string[]) {
        let allSeries = [];
        for (let i = 0; i < genres.length; i++) {
            allSeries = allSeries.concat((await this.serieRepo.find()).filter((serie) => serie.genre.toLowerCase().includes(genres[i].toLowerCase())));
        }
        return allSeries;
    }

    async getSerieByImdbId(imdbID: string) {
        const res = await this.providerService.getByImdbID(imdbID, "series");
        const result = res;
        await this.createSerie(result);
        return (await this.serieRepo.find()).filter((serie) => serie.imdbid === imdbID);
    }

    async getAllSeries() {
        return this.serieRepo.find();
    }

    async createSerie(body: Serie) {
        try {
            const newSerie = this.serieRepo.create();
            newSerie.imdbid = body.imdbID;
            newSerie.title = body.Title;
            newSerie.year = body.Year;
            newSerie.rated = body.Rated;
            newSerie.released = body.Released;
            newSerie.runtime = body.Runtime;
            newSerie.genre = body.Genre;
            newSerie.director = body.Director;
            newSerie.writer = body.Writer;
            newSerie.actors = body.Actors;
            newSerie.plot = body.Plot;
            newSerie.language = body.Language;
            newSerie.country = body.Country;
            newSerie.awards = body.Awards;
            newSerie.poster = body.Poster;
            newSerie.ratings = body.Ratings;
            newSerie.metascore = body.Metascore;
            newSerie.imdbrating = body.imdbRating;
            newSerie.imdbvotes = body.imdbVotes;
            newSerie.seasons = body.totalSeasons;
            return await this.serieRepo.save(newSerie);
        } catch (e) {
            throw new Error(e);
        }
    }
}
