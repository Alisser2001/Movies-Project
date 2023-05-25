import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/search.module.css"
import { useEffect } from "react";
import { getMoviesByGenres } from "../actions";

export default function Search() {
    const dispatch = useDispatch();
    const movie = useSelector((state: any) => state.movies[0]);
    useEffect(()=>{
        dispatch(getMoviesByGenres(movie.genre) as any);
    }, [])
    const relatedMovies = useSelector((state: any) => state.relatedMovies);
    return (
        <div className={styles.searchCont}>
            <section className={styles.poster}>
                <img src={movie ? movie.poster : "/belgian-g807cf7783_1280.png"} className={styles.img}/>
            </section>
            <section className={styles.info}>
                <h1 className={styles.title}>{movie ? movie.title : "N/A"}</h1>
                <p className={styles.description}>
                    {movie ? movie.plot : "N/A"}
                </p>
                <h3 className={styles.h3Data}>{movie ? movie.released : "N/A"}</h3>
                <h4 className={styles.h4Data}>Director: <a>{movie ? movie.director : "N/A"}</a></h4>
                <h4 className={styles.h4Data}>Writer: <a>{movie ? movie.writer : "N/A"}</a></h4>
                <h4 className={styles.h4Data}>Actors: <a>{movie ? movie.actors : "N/A"}</a></h4>
                <h4 className={styles.h4Data}>Genres: <a>{movie ? movie.genre : "N/A"}</a></h4>
                <h4 className={styles.h4Data}>Rated: <a>{movie ? movie.rated : "N/A"}</a></h4>
            </section>
            <section className={styles.relatedMovies}>
                <h1>Peliculas Relacionadas</h1>
                <ul>
                {relatedMovies.map((movie: any, count: number) => {
                        if (count<50) {
                            return (
                                <li>
                                    {movie.poster !== "N/A" && <img src={movie.poster} />}
                                    {movie.poster !== "N/A" && <p>
                                        {movie.title}
                                    </p>}
                                </li>
                            )
                        }
                    })}
                </ul>
            </section>
        </div>
    )
}