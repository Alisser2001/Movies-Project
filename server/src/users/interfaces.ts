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
    rating: string,
    type: "movie" | "serie",
    imdbid: string,
    name: string,
    poster: string
}