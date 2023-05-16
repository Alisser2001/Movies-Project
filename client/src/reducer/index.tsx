import { Reducer } from 'redux';

interface AppState {
    movies: []
}

const initialState: AppState = {
    movies: []
}

const rootReducer: Reducer<AppState, any> = (state = initialState, action: any) => {
    switch(action.type){
        case "GET_MOVIE_BY_NAME":
            return{
                ...state,
                movies: action.payload 
            }
        default:
            return state
    }
}

export default rootReducer;