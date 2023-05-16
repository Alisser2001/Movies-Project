import axios from "axios";
import { ThunkAction } from 'redux-thunk';
import { Dispatch, AnyAction } from "redux";

export function getMovieByName(name: string): ThunkAction<Promise<void>, any, any, AnyAction> {
    return async (dispatch: Dispatch) => {
        try {
            let json = await axios.get("/movies/all" + name);
            dispatch({
                type: "GET_MOVIE_BY_NAME",
                payload: json.data
            })
        } catch (e) {

        }
    }
}