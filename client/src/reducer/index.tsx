import { Reducer } from 'redux';

interface AppState {
    movies: [],
    relatedMovies: []
}

const initialState: AppState = {
    movies: [],
    relatedMovies: []
}

const rootReducer: Reducer<AppState, any> = (state = initialState, action: any) => {
    switch(action.type){
        case "GET_MOVIE_BY_NAME":
            return{
                ...state,
                movies: action.payload 
            }
        case "GET_ALL_MOVIES":
            return{
                ...state,
                movies: action.payload
            }
        case "GET_MOVIES_BY_GENRE":
            return{
                ...state,
                relatedMovies: action.payload
            }
        case "GET_MOVIE_BY_IMDBID":
            return{
                ...state,
                movies: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;