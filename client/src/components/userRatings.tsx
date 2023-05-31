import { useSelector } from "react-redux";
import styles from "../styles/userRatings.module.css";

export default function UserRating() {
    const favoritesMovies = useSelector((state: any) => state.favMovies);
    const favoritesSeries = useSelector((state: any) => state.favSeries);
    const userComments = useSelector((state: any) => state.userComments);
    const userRatings = useSelector((state: any) => state.userRatings);
    return (
        <div className={styles.uRatingsCont}>
            <h1>Tus Calificaciones</h1>
            <ul className={styles.ratingList}>
                {userRatings.map((rate: any) => {
                    return (
                        <li className={styles.rateItem}>
                            <h3 className={styles.name}>{rate.name}</h3>
                            <h3 className={styles.type}>{rate.type.charAt(0).toUpperCase() + rate.type.slice(1)}</h3>
                            <ul className={styles.startList}>
                                {rate.rating >= 1 ? <li className={styles.rateStarFill}></li> : <li className={styles.rateStar}></li>}
                                {rate.rating >= 2 ? <li className={styles.rateStarFill}></li> : <li className={styles.rateStar}></li>}
                                {rate.rating >= 3 ? <li className={styles.rateStarFill}></li> : <li className={styles.rateStar}></li>}
                                {rate.rating >= 4 ? <li className={styles.rateStarFill}></li> : <li className={styles.rateStar}></li>}
                                {rate.rating >= 5 ? <li className={styles.rateStarFill}></li> : <li className={styles.rateStar}></li>}
                            </ul>
                            {rate.type === "movie" ?
                                favoritesMovies.some((e: any) => e.imdbid === rate.imdbid) ?
                                    <button className={styles.favButtonFill}></button> :
                                    <button className={styles.favButton}></button>
                                : favoritesSeries.some((e: any) => e.imdbid === rate.imdbid) ?
                                    <button className={styles.favButtonFill}></button> :
                                    <button className={styles.favButton}></button>
                            }
                        </li>
                    )
                })}
            </ul>
            <h1>Tus comentarios</h1>
            <ul className={styles.ratingList}>
                {userComments.map((c: any) => {
                    return (
                        <li className={styles.rateItem}>
                            <h3 className={styles.name}>{c.name}</h3>
                            <p className={styles.comment}>{c.comment}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}