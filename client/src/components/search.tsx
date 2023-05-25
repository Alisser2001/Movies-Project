import { useSelector } from "react-redux";
import styles from "../styles/search.module.css"

export default function Search() {
    const movie = useSelector((state: any) => state.movies[0]);
    return (
        <div className={styles.searchCont}>
            <section className={styles.poster}>
                <img src={movie ? movie.poster : "/belgian-g807cf7783_1280.png"} />
            </section>
            <section className={styles.info}>
                <h1>{movie ? movie.title : "Not Found"}</h1>
                <h4>Director: {movie ? movie.director : "Not Found"}</h4>
                <h4>Writer: {movie ? movie.writer : "Not Found"}</h4>
                <h4>Actors: {movie ? movie.actors : "Not Found"}</h4>
                <h5>Genres: {movie ? movie.genre : "Not Found"}</h5>
                <h5>Rated: {movie ? movie.rated : "Not Found"}</h5>
                <p>
                    {movie ? movie.plot : "Not Found"}
                </p>
            </section>
        </div>
    )
}