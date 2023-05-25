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
            if (userCredential !== null) {
                dispatch({
                    type: "LOG_IN_USER",
                    payload: user
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