import { Reducer } from 'redux';

interface AppState {
    movies: [],
    series: [],
    relatedMovies: [],
    relatedSeries: [],
    searchType: "movies" | "series",
    userStatus: "logged" | "notLogged",
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
                email: action.payload.email
            }
        case "SIGN_UP_USER":
            return {
                ...state,
                fullname: action.payload.name + " " + action.payload.lastname,
                username: action.payload.username,
                email: action.payload.email
            }
        case "SIGN_OUT_USER":
            return {
                ...state,
                userStatus: "notLogged",
                username: "",
                fullname: "",
                email: "",
                favMovies: [],
                favSeries: [],
                userComments: [],
                userRatings: [],
                profileImg: ""
            }
        default:
            return state
    }
}

export default rootReducer;