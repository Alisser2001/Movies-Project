import axios from "axios";
import { ThunkAction } from 'redux-thunk';
import { Dispatch, AnyAction } from "redux";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    //signInWithPopup,
    //GoogleAuthProvider,
    //signOut,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

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

export function getMovieByName(name: string): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try {
            let json = await axios.get("http://localhost:3000/movies/all/" + name);
            dispatch({
                type: "GET_MOVIE_BY_NAME",
                payload: json.data
            })
        } catch (e) {
            throw new Error("Error")
        }
    }
}

export function getSerieByName(name: string): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try {
            let json = await axios.get("http://localhost:3000/series/all/" + name);
            console.log(json);
            dispatch({
                type: "GET_SERIE_BY_NAME",
                payload: json.data
            })
        } catch (e) {
            throw new Error("Error")
        }
    }
}

export function getMovieByImdbid(imdbid: string): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try {
            let json = await axios.get("http://localhost:3000/movies/movie/" + imdbid);
            dispatch({
                type: "GET_MOVIE_BY_IMDBID",
                payload: json.data
            })
        } catch (e: any) {
            throw new Error("Error")
        }
    }
}

export function getSerieByImdbid(imdbid: string): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try {
            let json = await axios.get("http://localhost:3000/series/serie/" + imdbid);
            dispatch({
                type: "GET_SERIE_BY_IMDBID",
                payload: json.data
            })
        } catch (e: any) {
            throw new Error("Error")
        }
    }
}

export function getAllMovies(): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try {
            let json = await axios.get("http://localhost:3000/movies/all");
            dispatch({
                type: "GET_ALL_MOVIES",
                payload: json.data
            })
        } catch (e) {
            throw new Error("Error")
        }
    }
}

export function getAllSeries(): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try {
            let json = await axios.get("http://localhost:3000/series/all");
            dispatch({
                type: "GET_ALL_SERIES",
                payload: json.data
            })
        } catch (e) {
            throw new Error("Error")
        }
    }
}

export function getMoviesByGenres(genres: string): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try {
            let json = await axios.get("http://localhost:3000/movies/genres?g=" + genres);
            dispatch({
                type: "GET_MOVIES_BY_GENRE",
                payload: json.data
            })
        } catch (e) {
            throw new Error("Error")
        }
    }
}

export function getSeriesByGenres(genres: string): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try {
            let json = await axios.get("http://localhost:3000/series/genres?g=" + genres);
            dispatch({
                type: "GET_SERIES_BY_GENRE",
                payload: json.data
            })
        } catch (e) {
            throw new Error("Error")
        }
    }
}

export function setSearchType(type: string): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: "SET_SEARCH_TYPE",
                payload: type
            })
        } catch (e) {
            throw new Error("Error")
        }
    }
}

export function LogInUser(data: any): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try {
            const { email, password } = data;
            let userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            const json = await axios.get(`http://localhost:3000/users/get/${user.uid}`);
            if (userCredential !== null) {
                dispatch({
                    type: "LOG_IN_USER",
                    payload: json.data
                })
            }
        } catch (e) {
            throw new Error("Error")
        }
    }
}

export function SignUpUser(data: any): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try {
            await axios.post("http://localhost:3000/users/create/", data);
            dispatch({
                type: "SIGN_UP_USER"
            })
        } catch (e) {
            throw new Error("Error")
        }
    }
}

export function signOutUser(): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try {
            await signOut(
                auth
            );
            dispatch({
                type: "SIGN_OUT_USER"
            })
        } catch (e) {
            throw new Error("Error")
        }
    }
}

export function newFavoriteMovie(data: any): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try{
            let favMovies = await axios.post("http://localhost:3000/users/movies/favorites/add", data);
            dispatch({
                type: "NEW_FAV_MOVIE",
                payload: favMovies.data
            })
        }catch(e) {
            throw new Error("Error")
        }
    }
}

export function newFavoriteSerie(data: any): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try{
            let favSeries = await axios.post("http://localhost:3000/users/series/favorites/add", data);
            dispatch({
                type: "NEW_FAV_SERIE",
                payload: favSeries.data
            })
        }catch(e) {
            throw new Error("Error")
        }
    }
}

export function removeFavoriteMovie(data: any): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try{
            let favMovies = await axios.post("http://localhost:3000/users/movies/favorites/remove", data);
            dispatch({
                type: "REMOVE_FAV_MOVIE",
                payload: favMovies.data
            })
        }catch(e) {
            throw new Error("Error")
        }
    }
}

export function removeFavoriteSerie(data: any): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try{
            let favSeries = await axios.post("http://localhost:3000/users/series/favorites/remove", data);
            dispatch({
                type: "REMOVE_FAV_SERIE",
                payload: favSeries.data
            })
        }catch(e) {
            throw new Error("Error")
        }
    }
}

export function newRating(data: any): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try{
            let ratings = await axios.post("http://localhost:3000/users/ratings/add", data);
            dispatch({
                type: "NEW_RATING",
                payload: ratings.data
            })
        }catch(e){
            throw new Error("Error")
        }
    }
}

export function newComment(data: any): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try{
            let comments = await axios.post("http://localhost:3000/users/comments/add", data);
            dispatch({
                type: "NEW_COMMENT",
                payload: comments.data
            })
        }catch(e){
            throw new Error("Error")
        }
    }
}