import styles from "../styles/login.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { LogInUser } from "../actions";

export default function LogIn(){
    const dispatch = useDispatch();
    const { register, handleSubmit, /*formState: { errors }*/ } = useForm();
    const handleSubmitUser = (data: any) => {
        dispatch(LogInUser(data) as any);
    }
    return(
        <div className={styles.loginCont}>
            <form onSubmit={handleSubmit(handleSubmitUser)} className={styles.form}>
                <h1 className={styles.title}>Iniciar Sesión</h1>
                <label className={styles.labelEmail}>Email</label>
                <input type="email" {...register("email", { required: true })} className={styles.inputEmail}/>
                <label className={styles.labelPassword}>Password</label>
                <input type="password" {...register("password", { required: true })} className={styles.inputPassword}/>
                <input type="submit" className={styles.submit}/>
                <p className={styles.signUpLink}>¿No tienes una cuenta? <a href="/signup">Suscríbete ahora</a></p>
            </form>
        </div>
    )
}