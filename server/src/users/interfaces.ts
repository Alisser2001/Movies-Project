import { UUID } from "crypto";
import { Movies } from "src/movies/movies.entity";
import { Series } from "src/series/series.entity";

export interface Comments {
    comment: string,
    type: "movie" | "serie",
    imdbid: string,
    name: string,
    poster: string
}

export interface Ratings {
    rating: number,
    type: "movie" | "serie",
    imdbid: string,
    name: string,
    poster: string
}

export interface User {
    uid: UUID
    name: string;
    lastname: string;
    username: string;
    email: string;
}