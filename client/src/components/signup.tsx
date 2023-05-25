import styles from "../styles/signup.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SignUpUser } from "../actions";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

export default function SignUp() {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, /*formState: { errors }*/ } = useForm();
    const handleSubmitUser = (data: any) => {
        dispatch(SignUpUser(data) as any);
        toast.success('Usuario creado con exito');
        Navigate("/login");
    }
    return (
        <div className={styles.signupCont}>
            <Toaster />
            <div className={styles.formCont}>
                <h1 className={styles.title}>Registrarse</h1>
                <form onSubmit={handleSubmit(handleSubmitUser)} className={styles.form}>
                    <div>
                        <label className={styles.labelName}>Name</label>
                        <input type="text" {...register("name", { required: true })} className={styles.inputName} />
                    </div>
                    <div>
                        <label className={styles.labelLastname}>Lastname</label>
                        <input type="text" {...register("lastname", { required: true })} className={styles.inputLastname} />
                    </div>
                    <div>
                        <label className={styles.labelUsername}>Username</label>
                        <input type="text" {...register("username", { required: true })} className={styles.inputUsername} />
                    </div>
                    <div>
                        <label className={styles.labelEmail}>Email</label>
                        <input type="email" {...register("email", { required: true })} className={styles.inputEmail} />
                    </div>
                    <div>
                        <label className={styles.labelPassword}>Password</label>
                        <input type="password" {...register("password", { required: true })} className={styles.inputPassword} />
                    </div>
                    <div>
                        <label className={styles.labelRepeatPassword}>Repeat Password</label>
                        <input type="password" {...register("repeatPassword", { required: true })} className={styles.inputRepeatPassword} />
                    </div>
                    <input type="submit" className={styles.submit} />
                </form>
                <p className={styles.signUpLink}>¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a></p>
            </div>
        </div>
    )
}