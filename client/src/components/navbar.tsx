import styles from "../styles/navbar.module.css";

export default function Navbar(){
    return(
        <nav className={styles.navbar}>
            <a className={styles.logo} href=" "/>
            <p className={styles.title}>FlickVerse</p>
            <button className={styles.loginButton}>Iniciar Sesión</button>
        </nav>
    )
}