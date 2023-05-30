import styles from "../styles/landing.module.css";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    getAllMovies,
    getAllSeries,
    getMovieByImdbid,
    getSerieByImdbid,
    getMovieByName,
    getSerieByName,
    setSearchType
} from "../actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function LandingPage() {
    const { register, handleSubmit, /*formState: { errors }*/ } = useForm();
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMovies() as any);
        dispatch(getAllSeries() as any)
    }, []);

    const allMovies = useSelector((state: any) => state.movies);
    const allSeries = useSelector((state: any) => state.series);

    const handleSearchName = (data: any) => {
        if (data.type === "movies") {
            dispatch(getMovieByName(data.name) as any);
            dispatch(setSearchType("movies") as any);
            Navigate("/results");
        } else if (data.type === "series") {
            dispatch(getSerieByName(data.name) as any);
            dispatch(setSearchType("series") as any);
            Navigate("/results");
        }
    }

    const handleSearchMovieByImdbid = (imdbid: string) => {
        dispatch(getMovieByImdbid(imdbid) as any);
        dispatch(setSearchType("movies") as any);
        Navigate(`/search/${imdbid}`);
    }

    const handleSearchSerieByImdbid = (imdbid: string) => {
        dispatch(getSerieByImdbid(imdbid) as any);
        dispatch(setSearchType("series") as any);
        Navigate(`/search/${imdbid}`);
    }

    return (
        <div className={styles.landingCont}>
            <section className={styles.searchLanding}>
                <h1 className={styles.title}>Todas tus películas y series en un sólo lugar</h1>
                <h2 className={styles.subtitle}>Navega ahora mismo entre tus peliculas y serie favoritas.</h2>
                <form className={styles.search} onSubmit={handleSubmit(handleSearchName)}>
                    <input className={styles.searchInput} content="Pelicula o serie" type="text" {...register("name", { required: true })} />
                    <select className={styles.selectType} {...register("type", { required: true })}>
                        <option value="movies" className={styles.type}>Movies</option>
                        <option value="series" className={styles.type}>Series</option>
                    </select>
                    <input className={styles.searchButton} type="submit" value="Buscar" />
                </form>
            </section>
            <section className={styles.allMovies}>
                <h1 className={styles.allMoviesTitle}>Todas nuestras peliculas</h1>
                <ul className={styles.moviesList}>
                    {allMovies.map((movie: any, count: number) => {
                        if (count < 25 && movie.poster !== "N/A") {
                            return (
                                <li className={styles.movie} onClick={() => handleSearchMovieByImdbid(movie.imdbid)} key={movie.imdbid}>
                                    <img src={movie.poster} className={styles.moviePoster} />
                                    <p>
                                        {movie.title}
                                    </p>
                                </li>
                            )
                        }
                    })}
                </ul>
                <h1 className={styles.allSeriesTitle}>Todas nuestras series</h1>
                <ul className={styles.seriesList}>
                    {allSeries.map((serie: any, count: number) => {
                        if (count < 25 && serie.poster !== "N/A") {
                            return (
                                <li className={styles.serie} onClick={() => handleSearchSerieByImdbid(serie.imdbid)} key={serie.imdbid}>
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