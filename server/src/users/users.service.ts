import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { initializeApp } from "firebase/app";
import {
    getAuth,
    //signInWithPopup,
    //GoogleAuthProvider,
    //signOut,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { Ratings, User } from './interfaces';
import { UUID } from 'crypto';
import { Movies } from 'src/movies/movies.entity';
import { Series } from 'src/series/series.entity';
import { Comments } from './interfaces';

const firebaseConfig = {
    apiKey: "AIzaSyChmubKNWq-XJd-ERD2v8R-HrPikLFJrsA",
    authDomain: "movies-5cf97.firebaseapp.com",
    projectId: "movies-5cf97",
    storageBucket: "movies-5cf97.appspot.com",
    messagingSenderId: "659474995814",
    appId: "1:659474995814:web:1078ff79f80a6b7e21eba7",
    measurementId: "G-006ZEGNNHM"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private usersRepo: Repository<Users>,
        @InjectRepository(Movies) private moviesRepo: Repository<Movies>,
        @InjectRepository(Series) private seriesRepo: Repository<Series>
    ) { }

    async getUser(uid: string){
        try{
            const user = this.usersRepo.findOne({
                where: {
                    id: uid as UUID
                },
                relations: ["favoritesmovies", "favoritesseries"]
            });
            if(user){
                return user
            } else {
                throw new Error("Usuario no encontrado");
            }
        }catch(e){
            throw new Error(e);
        }
    }
    async signUpUser(name: string, lastname: string, username: string, email: string, password: string) {
        let userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        const userExists = this.usersRepo.findOne({ where: { email: email } });
        if (user && userExists) {
            this.createUser({
                uid: user.uid as UUID,
                name: name,
                lastname: lastname,
                username: username,
                email: user.email
            });
        }
        await updateProfile(user, { displayName: name + " " + lastname }).catch((err) => {
            throw new Error(err);
        });
        return "El usuario fue creado con éxito";
    }

    async createUser(body: User) {
        try {
            const newUser = this.usersRepo.create();
            newUser.id = body.uid;
            newUser.name = body.name;
            newUser.lastname = body.lastname;
            newUser.username = body.username;
            newUser.email = body.email;
            return await this.usersRepo.save(newUser);
        } catch (e) {
            throw new Error(e);
        }
    }

    async newFavoriteMovie(body: any) {
        try {
            const user = await this.usersRepo.findOne({
                where: {
                    id: body.uid
                }
            });
            const movie = await this.moviesRepo.findOne({
                where: {
                    imdbid: body.imdbid
                }
            });
            if (user && movie) {
                if (!user.favoritesmovies) {
                    user.favoritesmovies = []; // Inicializar como array vacío si es nulo o indefinido
                }
                user.favoritesmovies.push(movie);
                await this.usersRepo.save(user);
                return user.favoritesmovies;
            } else {
                throw new Error("Usuario o pelicula no encontrados");
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    async removeFavoriteMovie(body: any) {
        try {
            const user = await this.usersRepo.findOne({
                where: {
                    id: body.uid
                }
            });
            const movie = await this.moviesRepo.findOne({
                where: {
                    imdbid: body.imdbid
                }
            });
            if (user && movie) {
                user.favoritesmovies = user.favoritesmovies.filter((movie: any) => movie.imdbid !== body.imdbid);
                await this.usersRepo.save(user);
                return user.favoritesmovies;
            } else {
                throw new Error("Usuario o pelicula no encontrados");
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    async newFavoriteSerie(body: any) {
        try {
            const user = await this.usersRepo.findOne({
                where: {
                    id: body.uid
                }
            });
            const serie = await this.seriesRepo.findOne({
                where: {
                    imdbid: body.imdbid
                }
            });
            if (user && serie) {
                if (!user.favoritesseries) {
                    user.favoritesseries = []; // Inicializar como array vacío si es nulo o indefinido
                }
                user.favoritesseries.push(serie);
                await this.usersRepo.save(user);
                return user.favoritesseries;
            } else {
                throw new Error("Usuario o serie no encontrados");
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    async removeFavoriteSerie(body: any) {
        try {
            const user = await this.usersRepo.findOne({
                where: {
                    id: body.uid
                }
            });
            const serie = await this.seriesRepo.findOne({
                where: {
                    imdbid: body.imdbid
                }
            });
            if (user && serie) {
                user.favoritesseries = user.favoritesseries.filter((movie: any) => movie.imdbid !== body.imdbid);
                await this.usersRepo.save(user);
                return user.favoritesseries;
            } else {
                throw new Error("Usuario o serie no encontrados");
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    async newRating(body: any) {
        try {
            const user = await this.usersRepo.findOne({
                where: {
                    id: body.uid
                }
            });
            if (user) {
                const rating: Ratings = {
                    rating: body.rating,
                    type: body.type,
                    imdbid: body.imdbid,
                    name: body.name,
                    poster: body.poster
                }
                if (!user.ratings) {
                    user.ratings = []; // Inicializar como array vacío si es nulo o indefinido
                }
                user.ratings.push(rating);
                await this.usersRepo.save(user);
                return user.ratings;
            } else {
                throw new Error("Usuario no encontrado");
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    async newComment(body: any) {
        try {
            const user = await this.usersRepo.findOne({
                where: {
                    id: body.uid
                }
            });
            if (user) {
                const comment: Comments = {
                    comment: body.comment,
                    type: body.type,
                    imdbid: body.imdbid,
                    name: body.name,
                    poster: body.poster
                }
                if (!user.comments) {
                    user.comments = []; // Inicializar como array vacío si es nulo o indefinido
                }
                user.comments.push(comment);
                await this.usersRepo.save(user);
                return user.comments;
            } else {
                throw new Error("Usuario no encontrado");
            }
        } catch (e) {
            throw new Error(e);
        }
    }
}
