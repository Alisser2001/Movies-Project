import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByName, signOutUser } from "../actions";
import { useState } from "react";

export default function Navbar() {
    const [loggedMenu, setLoggedMenu] = useState(false);
    const { register, handleSubmit, /*formState: { errors }*/ } = useForm();
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const userStatus = useSelector((state: any) => state.userStatus);
    const username = useSelector((state: any) => state.username);

    const handleSearchName = (data: any) => {
        dispatch(getMovieByName(data.name) as any);
        Navigate("/results");
    }

    const handleUserLogin = () => {
        setLoggedMenu(false);
        dispatch(signOutUser() as any);
        Navigate("/");
    }
    return (
        <nav className={styles.navbar}>
            <a className={styles.logo} href="/" />
            <p className={styles.title}>FlickVerse</p>
            <form className={styles.search} onSubmit={handleSubmit(handleSearchName)}>
                <input type="text" className={styles.inputField} {...register("name", { required: true })} />
                <input type="submit" value=" " className={styles.inputSubmit} />
            </form>
            {userStatus === "notLogged" && <button className={styles.loginButton} onClick={() => Navigate("/login")}>Iniciar Sesión</button>}
            {userStatus === "logged" && <button className={styles.loggedImg} onClick={()=>setLoggedMenu(!loggedMenu)}/>}
            {loggedMenu && <ul className={styles.loggedMenu}>
                <li className={styles.username}>User: {username}</li>
                <li className={styles.loggedOption} onClick={()=>Navigate("/userRatings")}>Ratings</li>
                <li className={styles.loggedOption} onClick={()=>handleUserLogin()}>Sign Out</li>    
            </ul>}
        </nav>
    )
}