import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getMovieByName } from "../actions";

export default function Navbar(){
    const { register, handleSubmit, /*formState: { errors }*/ } = useForm();
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSearchName = (data: any) => {
        dispatch(getMovieByName(data.name) as any);
        Navigate("/search");
    }
    return(
        <nav className={styles.navbar}>
            <a className={styles.logo} href="/"/>
            <p className={styles.title}>FlickVerse</p>
            <form className={styles.search} onSubmit={handleSubmit(handleSearchName)}>
                <input type="text" className={styles.inputField} {...register("name", { required: true })}/>
                <input type="submit" value=" " className={styles.inputSubmit}/>
            </form>
            <button className={styles.loginButton} onClick={()=>Navigate("/login")}>Iniciar Sesión</button>
        </nav>
    )
}