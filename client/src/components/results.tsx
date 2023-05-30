import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/search.module.css";
import { useNavigate } from "react-router-dom";
import { getMovieByImdbid, getSerieByImdbid } from "../actions";

export default function Results() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const allMovies = useSelector((state: any) => state.movies);
    const allSeries = useSelector((state: any) => state.series);
    const searchType = useSelector((state: any) => state.searchType);

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
        <section className={styles.searchMovies}>
            <h1 className={styles.searchTitle}>{searchType === "movies" ? "Peliculas" : "Series"} Encontradas</h1>
            <ul className={styles.moviesList}>
                {searchType === "movies" && allMovies.map((movie: any, count: number) => {
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
                {searchType === "series" && allSeries.map((serie: any, count: number) => {
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
    )
}