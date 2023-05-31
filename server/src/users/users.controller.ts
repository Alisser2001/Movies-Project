import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userServices: UsersService) { }
    @Get("get/:uid")
    getUser(@Param("uid") uid: any){
        return this.userServices.getUser(uid);
    }

    @Post("create")
    signUpUser(@Body() body: any) {
        return this.userServices.signUpUser(body.name, body.lastname, body.username, body.email, body.password);
    }

    @Post("movies/favorites/add")
    newFavoriteMovie(@Body() body: any) {
        return this.userServices.newFavoriteMovie(body);
    }

    @Post("movies/favorites/remove")
    removeFavoriteMovie(@Body() body: any) {
        return this.userServices.removeFavoriteMovie(body);
    }

    @Post("series/favorites/add")
    newFavoriteSerie(@Body() body: any) {
        return this.userServices.newFavoriteSerie(body);
    }

    @Post("series/favorites/remove")
    removeFavoriteSerie(@Body() body: any) {
        return this.userServices.removeFavoriteSerie(body);
    }

    @Post("ratings/add")
    newRating(@Body() body: any) {
        return this.userServices.newRating(body);
    }

    @Post("comments/add")
    newComment(@Body() body: any) {
        return this.userServices.newComment(body);
    }
}
