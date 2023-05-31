import { Reducer } from 'redux';

interface AppState {
    movies: [],
    series: [],
    relatedMovies: [],
    relatedSeries: [],
    searchType: "movies" | "series",
    userStatus: "logged" | "notLogged",
    uid: string,
    username: string,
    fullname: string,
    email: string,
    favMovies: [],
    favSeries: [],
    userComments: [],
    userRatings: []
}

const initialState: AppState = {
    movies: [],
    series: [],
    relatedMovies: [],
    relatedSeries: [],
    searchType: "movies",
    userStatus: "notLogged",
    uid: "",
    username: "",
    fullname: "",
    email: "",
    favMovies: [],
    favSeries: [],
    userComments: [],
    userRatings: []
}

const rootReducer: Reducer<AppState, any> = (state = initialState, action: any) => {
    switch (action.type) {
        case "GET_MOVIE_BY_NAME":
            return {
                ...state,
                movies: action.payload
            }
        case "GET_SERIE_BY_NAME":
            return {
                ...state,
                series: action.payload
            }
        case "GET_ALL_MOVIES":
            return {
                ...state,
                movies: action.payload
            }
        case "GET_ALL_SERIES":
            return {
                ...state,
                series: action.payload
            }
        case "GET_MOVIES_BY_GENRE":
            return {
                ...state,
                relatedMovies: action.payload
            }
        case "GET_SERIES_BY_GENRE":
            return {
                ...state,
                relatedSeries: action.payload
            }
        case "GET_MOVIE_BY_IMDBID":
            return {
                ...state,
                movies: action.payload
            }
        case "GET_SERIE_BY_IMDBID":
            return {
                ...state,
                series: action.payload
            }
        case "SET_SEARCH_TYPE":
            return {
                ...state,
                searchType: action.payload
            }
        case "LOG_IN_USER":
            return {
                ...state,
                userStatus: "logged",
                uid: action.payload.uid,
                email: action.payload.email,
                fullname: action.payload.name + " " + action.payload.lastname,
                username: action.payload.username,
                userRatings: action.payload.ratings,
                userComments: action.payload.comments,
                favMovies: action.payload.favoritesmovies,
                favSeries: action.payload.favoritesseries
            }
        case "SIGN_UP_USER":
            return {
                ...state,
            }
        case "SIGN_OUT_USER":
            return {
                ...state,
                userStatus: "notLogged",
                uid: "",
                username: "",
                fullname: "",
                email: "",
                favMovies: [],
                favSeries: [],
                userComments: [],
                userRatings: [],
                profileImg: ""
            }
        case "NEW_FAV_MOVIE":
            return{
                ...state,
                favMovies: action.payload
            }
        case "NEW_FAV_SERIE":
            return{
                ...state,
                favSerie: action.payload
            }
        case "REMOVE_FAV_MOVIE":
            return{
                ...state,
                favMovies: action.payload
            }
        case "REMOVE_FAV_MOVIE":
            return{
                ...state,
                favMovies: action.payload
            }
        case "NEW_RATING":
            return{
                ...state,
                userRatings: action.payload
            }
        case "NEW_COMMENT":
            return{
                ...state,
                userComments: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;