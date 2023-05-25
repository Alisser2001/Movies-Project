import styles from "../styles/landing.module.css";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getMovieByName } from "../actions";

export default function LandingPage(){
    const { register, handleSubmit, /*formState: { errors }*/ } = useForm();
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSearchName = (data: any) => {
        dispatch(getMovieByName(data.name) as any);
        Navigate("/search");
    }
    
    return(
        <div className={styles.landingCont}>
            <h1 className={styles.title}>Todas tus películas y series en un sólo lugar</h1>
            <h2 className={styles.subtitle}>Navega ahora mismo entre tus peliculas y serie favoritas.</h2>
            <form className={styles.search} onSubmit={handleSubmit(handleSearchName)}>
                <input className={styles.searchInput} content="Pelicula o serie" type="text" {...register("name", { required: true })}/>
                <input className={styles.searchButton} type="submit" value="Buscar"/>
            </form>
        </div>
    )
}