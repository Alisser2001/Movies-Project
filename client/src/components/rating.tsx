import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import styles from "../styles/rating.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { newFavoriteMovie, newFavoriteSerie, newRating, newComment } from "../actions";

export default function Rating() {
    const Navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [fav, setFav] = useState(false);
    const [comment, setComment] = useState("");
    const movie = useSelector((state: any) => state.movies[0]);
    const serie = useSelector((state: any) => state.series[0]);
    const uid = useSelector((state: any) => state.uid);
    const { imdbid } = useParams();
    const searchType = useSelector((state: any) => state.searchType);
    const dispatch = useDispatch();

    const handleFavoriteMovie = () => {
        setFav(!fav);
    }

    const handleFavoriteSerie = () => {
        setFav(!fav);
    }

    const handleRating = (rate: number) => {
        setRating(rate);
    }

    const handleComment = (e: any) => {
        setComment(e.target.value);
    }

    const handleSubmitRatingMovie = () => {
        const newRat = {
            rating: rating,
            type: "movie",
            imdbid: imdbid,
            name: movie.title,
            poster: movie.poster
        }
        const newCom = {
            comment: comment,
            type: "movie",
            imdbid: imdbid,
            name: movie.title,
            poster: movie.poster
        }
        const newFav = {
            uid: uid,
            imdbid: imdbid
        }
        const isFavorite = fav;
        dispatch(newRating(newRat) as any);
        if (isFavorite) {
            dispatch(newFavoriteMovie(newFav) as any);
        }
        dispatch(newComment(newCom) as any);
        Navigate("/userRatings");
    }

    const handleSubmitRatingSerie = () => {
        const newRat = {
            rating: rating,
            type: "serie",
            imdbid: imdbid,
            name: movie.title,
            poster: movie.poster
        }
        const newCom = {
            comment: comment,
            type: "serie",
            imdbid: imdbid,
            name: movie.title,
            poster: movie.poster
        }
        const newFav = {
            uid: uid,
            imdbid: imdbid
        }
        const isFavorite = fav;
        dispatch(newRating(newRat) as any);
        if (isFavorite) {
            dispatch(newFavoriteSerie(newFav) as any);
        }
        dispatch(newComment(newCom) as any);
    }

    return (
        <div className={styles.ratingCont}>
            <section className={styles.poster}>
                {searchType === "movies" && <img src={movie ? movie.poster : "/belgian-g807cf7783_1280.png"} className={styles.img} />}
                {searchType === "series" && <img src={serie ? serie.poster : "/belgian-g807cf7783_1280.png"} className={styles.img} />}
            </section>
            <section className={styles.rate}>
                {searchType === "movies" && <>
                    <h1 className={styles.title}>{movie ? movie.title : "N/A"}</h1>
                    <ul className={styles.rateList}>
                        <label className={styles.labelRate}>Calificar: </label>
                        {rating >= 1 ? <li className={styles.rateStarFill} onClick={() => handleRating(1)}></li> : <li className={styles.rateStar} onClick={() => handleRating(1)}></li>}
                        {rating >= 2 ? <li className={styles.rateStarFill} onClick={() => handleRating(2)}></li> : <li className={styles.rateStar} onClick={() => handleRating(2)}></li>}
                        {rating >= 3 ? <li className={styles.rateStarFill} onClick={() => handleRating(3)}></li> : <li className={styles.rateStar} onClick={() => handleRating(3)}></li>}
                        {rating >= 4 ? <li className={styles.rateStarFill} onClick={() => handleRating(4)}></li> : <li className={styles.rateStar} onClick={() => handleRating(4)}></li>}
                        {rating >= 5 ? <li className={styles.rateStarFill} onClick={() => handleRating(5)}></li> : <li className={styles.rateStar} onClick={() => handleRating(5)}></li>}
                    </ul>
                    <div className={styles.favCont}>
                        <label className={styles.labelFav}>Añadir a favoritos: </label>
                        {!fav && <button className={styles.favButton} onClick={() => handleFavoriteMovie()}></button>}
                        {fav && <button className={styles.favButtonFill} onClick={() => handleFavoriteMovie()}></button>}
                    </div>
                    <div className={styles.commentCont}>
                        <label className={styles.labelComment}>Comentarios: </label>
                        <input type="text" className={styles.textarea} onChange={(e) => handleComment(e)}></input>
                    </div>
                    <button className={styles.submit} onClick={() => handleSubmitRatingMovie()}>Enviar</button>
                </>}
                {searchType === "series" && <>
                    <h1 className={styles.title}>{serie ? serie.title : "N/A"}</h1>
                    <ul className={styles.rateList}>
                        <label className={styles.labelRate}>Calificar: </label>
                        {rating >= 1 ? <li className={styles.rateStarFill} onClick={() => handleRating(1)}></li> : <li className={styles.rateStar} onClick={() => handleRating(1)}></li>}
                        {rating >= 2 ? <li className={styles.rateStarFill} onClick={() => handleRating(2)}></li> : <li className={styles.rateStar} onClick={() => handleRating(2)}></li>}
                        {rating >= 3 ? <li className={styles.rateStarFill} onClick={() => handleRating(3)}></li> : <li className={styles.rateStar} onClick={() => handleRating(3)}></li>}
                        {rating >= 4 ? <li className={styles.rateStarFill} onClick={() => handleRating(4)}></li> : <li className={styles.rateStar} onClick={() => handleRating(4)}></li>}
                        {rating >= 5 ? <li className={styles.rateStarFill} onClick={() => handleRating(5)}></li> : <li className={styles.rateStar} onClick={() => handleRating(5)}></li>}
                    </ul>
                    <div className={styles.favCont}>
                        <label className={styles.labelFav}>Añadir a favoritos: </label>
                        <button className={styles.favButton} onClick={() => handleFavoriteSerie()}></button>
                    </div>
                    <div className={styles.commentCont}>
                        <label className={styles.labelComment}>Comentarios: </label>
                        <input type="text" className={styles.textarea} onChange={(e) => handleComment(e)}></input>
                    </div>
                    <button className={styles.submit} onClick={() => handleSubmitRatingSerie()}>Enviar</button>
                </>}
            </section>
        </div >
    )
}