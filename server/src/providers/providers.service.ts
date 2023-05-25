import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProvidersService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) { }
    async getByName(name: string, type: string) {
        try {
            const apikey = this.configService.get("API_KEY");
            const response = await firstValueFrom(
                this.httpService.get(`https://www.omdbapi.com/?s=${name}&apikey=${apikey}&type=${type}`)
            )
            return response.data;
        } catch (e) {
            throw new Error("Something went wrong");
        }
    }
    async getByImdbID(imdbID: string, type: string) {
        try {
            const apikey = this.configService.get("API_KEY");
            const response = await firstValueFrom(
                this.httpService.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apikey}&type=${type}`)
            )
            return response.data;
        } catch (e) {
            throw new Error("Something went wrong");
        }
    }
}

