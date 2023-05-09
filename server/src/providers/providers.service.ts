import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProvidersService {
    constructor(private readonly httpService: HttpService) { }
    async getAllChars(page: number) {
        try{
            const response = await firstValueFrom(
                this.httpService.get("https://rickandmortyapi.com/api/character?page="+page)
            );
            return response.data.results;
        }catch(e){
            throw new Error("Something went wrong");
        }
    }
    async getPagesChars() {
        try{
            const response = await firstValueFrom(
                this.httpService.get("https://rickandmortyapi.com/api/character")
            );
            return response.data.info.pages;
        }catch(e){
            throw new Error("Something went wrong");
        }
    }

    async getAllLocations(page: number) {
        try{
            const response = await firstValueFrom(
                this.httpService.get("https://rickandmortyapi.com/api/location?page="+page)
            );
            return response.data.results;
        }catch(e){
            throw new Error("Something went wrong");
        }
    }
    async getPagesLocations() {
        try{
            const response = await firstValueFrom(
                this.httpService.get("https://rickandmortyapi.com/api/location")
            );
            return response.data.info.pages;
        }catch(e){
            throw new Error("Something went wrong");
        }
    }

    async getAllEpisodes(page: number) {
        try{
            const response = await firstValueFrom(
                this.httpService.get("https://rickandmortyapi.com/api/episode?page="+page)
            );
            return response.data.results;
        }catch(e){
            throw new Error("Something went wrong");
        }
    }
    async getPagesEpisodes() {
        try{
            const response = await firstValueFrom(
                this.httpService.get("https://rickandmortyapi.com/api/episode")
            );
            return response.data.info.pages;
        }catch(e){
            throw new Error("Something went wrong");
        }
    }
}

