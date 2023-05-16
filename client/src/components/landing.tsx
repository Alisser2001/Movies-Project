import styles from "../styles/landing.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByName } from "../actions";

export default function LandingPage(){
    const dispatch = useDispatch();
    dispatch(getMovieByName("All Creatures Great and Small") as any);
    console.log(useSelector((state: any)=>state.movies));
    return(
        <div className={styles.landingCont}>
            <h1 className={styles.title}>Todas tus películas y series en un sólo lugar</h1>
            <h2 className={styles.subtitle}>Navega ahora mismo entre tus peliculas y serie favoritas.</h2>
            <form className={styles.search}>
                <input className={styles.searchInput} content="Pelicula o serie" type="text"/>
                <button className={styles.searchButton}>Buscar</button>
            </form>
        </div>
    )
}