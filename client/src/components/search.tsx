import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/search.module.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMoviesByGenres, getMovieByImdbid, getSeriesByGenres, getSerieByImdbid } from "../actions";

export default function Search() {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const movie = useSelector((state: any) => state.movies[0]);
    const serie = useSelector((state: any) => state.series[0]);
    const searchType = useSelector((state: any) => state.searchType);
    const userStatus = useSelector((state: any) => state.userStatus);
    useEffect(() => {
        if (searchType === "movies") {
            dispatch(getMoviesByGenres(movie.genre) as any);
        } else if (searchType === "series") {
            dispatch(getSeriesByGenres(serie.genre) as any);
        }
    }, [movie, serie]);

    const relatedMovies = useSelector((state: any) => state.relatedMovies);
    const relatedSeries = useSelector((state: any) => state.relatedSeries);

    const handleSearchImdbid = (imdbid: string, type: "series" | "movies") => {
        if (type === "movies") {
            dispatch(getMovieByImdbid(imdbid) as any);
            Navigate(`/search/id=${imdbid}`);
        } else if (type === "series") {
            dispatch(getSerieByImdbid(imdbid) as any);
            Navigate(`/search/id=${imdbid}`);
        }
    }

    return (
        <div className={styles.searchCont}>
            <section className={styles.poster}>
                {searchType === "movies" && <img src={movie ? movie.poster : "/belgian-g807cf7783_1280.png"} className={styles.img} />}
                {searchType === "series" && <img src={serie ? serie.poster : "/belgian-g807cf7783_1280.png"} className={styles.img} />}
            </section>
            <section className={styles.info}>
                {searchType === "movies" && <>
                    <h1 className={styles.title}>{movie ? movie.title : "N/A"}</h1>
                    <h3 className={styles.h3Data}>Movie {movie ? "of " + movie.year : ""}</h3>
                    <p className={styles.description}>
                        {movie ? movie.plot : "N/A"}
                    </p>
                    <h4 className={styles.h4Data}>Director: <a>{movie ? movie.director : "N/A"}</a></h4>
                    <h4 className={styles.h4Data}>Writer: <a>{movie ? movie.writer : "N/A"}</a></h4>
                    <h4 className={styles.h4Data}>Actors: <a>{movie ? movie.actors : "N/A"}</a></h4>
                    <h4 className={styles.h4Data}>Genres: <a>{movie ? movie.genre : "N/A"}</a></h4>
                    <h4 className={styles.h4Data}>Rated: <a>{movie ? movie.rated : "N/A"}</a></h4>
                    <section className={styles.rating}>
                        {userStatus === "logged" ? 
                        <button className={styles.ratingButton} onClick={()=>Navigate(`/rating/${movie.imdbid}`)}>Calificar</button> :
                        <p>Inicia sesión y crea tu reseña</p>}
                    </section>
                </>}
                {searchType === "series" && <>
                    <h1 className={styles.title}>{serie ? serie.title : "N/A"}</h1>
                    <p className={styles.description}>
                        {serie ? serie.plot : "N/A"}
                    </p>
                    <h3 className={styles.h3Data}>Serie {serie ? "of " + serie.year : ""}</h3>
                    <h4 className={styles.h4Data}>Director: <a>{serie ? serie.director : "N/A"}</a></h4>
                    <h4 className={styles.h4Data}>Writer: <a>{serie ? serie.writer : "N/A"}</a></h4>
                    <h4 className={styles.h4Data}>Actors: <a>{serie ? serie.actors : "N/A"}</a></h4>
                    <h4 className={styles.h4Data}>Genres: <a>{serie ? serie.genre : "N/A"}</a></h4>
                    <h4 className={styles.h4Data}>Rated: <a>{serie ? serie.rated : "N/A"}</a></h4>
                    <section className={styles.rating}>
                        {userStatus === "logged" ? 
                        <button className={styles.ratingButton} onClick={()=>Navigate(`/rating/${serie.imdbid}`)}>Calificar</button>:
                        <p>Inicia sesión y crea tu reseña</p>}
                    </section>
                </>}
            </section>
            <section className={styles.relatedMovies}>
                <h1 className={styles.relatedTitle}>{searchType === "movies" ? "Peliculas" : "Series"} Relacionadas</h1>
                <ul className={styles.moviesList}>
                    {searchType === "movies" && relatedMovies.map((movie: any, count: number) => {
                        if (count < 50 && movie.poster !== "N/A") {
                            return (
                                <li className={styles.movie} key={"m" + movie.imdbid + count} onClick={() => handleSearchImdbid(movie.imdbid, "movies")}>
                                    <img src={movie.poster} className={styles.moviePoster} />
                                    <p>
                                        {movie.title}
                                    </p>
                                </li>
                            )
                        }
                    })}
                    {searchType === "series" && relatedSeries.map((serie: any, count: number) => {
                        if (count < 50 && serie.poster !== "N/A") {
                            return (
                                <li className={styles.serie} key={"s" + serie.imdbid + count} onClick={() => handleSearchImdbid(serie.imdbid, "series")}>
                                    <img src={serie.poster} className={styles.seriePoster} />
                                    <p>
                                        {serie.title}
                                    </p>
                                </li>
                            )
                        }
                    })}
                </ul>
            </section>
        </div>
    )
}