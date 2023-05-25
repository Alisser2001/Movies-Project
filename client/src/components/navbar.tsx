import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const Navigate = useNavigate();
    return(
        <nav className={styles.navbar}>
            <a className={styles.logo} href="/"/>
            <p className={styles.title}>FlickVerse</p>
            <button className={styles.loginButton} onClick={()=>Navigate("/login")}>Iniciar Sesión</button>
        </nav>
    )
}