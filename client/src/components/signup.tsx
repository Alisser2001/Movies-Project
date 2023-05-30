import styles from "../styles/signup.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SignUpUser } from "../actions";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import { emailValidator, nameValidator, passwordValidator } from "../validators/validator";

export default function SignUp() {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
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
                    <div className={styles.inputCont}>
                        <label className={styles.labelName}>Name</label>
                        <input type="text" {...register("name", { required: true, validate: nameValidator })} className={styles.inputName} />
                        {errors.name && <p className={styles.errorText}>The name is invalid</p>}
                    </div>
                    <div className={styles.inputCont}>
                        <label className={styles.labelLastname}>Lastname</label>
                        <input type="text" {...register("lastname", { required: true, validate: nameValidator })} className={styles.inputLastname} />
                        {errors.lastname && <p className={styles.errorText}>The lastname is invalid</p>}
                    </div>
                    <div className={styles.inputCont}>
                        <label className={styles.labelUsername}>Username</label>
                        <input type="text" {...register("username", { required: true, validate: nameValidator })} className={styles.inputUsername} />
                        {errors.username && <p className={styles.errorText}>The username is invalid</p>}
                    </div>
                    <div className={styles.inputCont}>
                        <label className={styles.labelEmail}>Email</label>
                        <input type="email" {...register("email", { required: true, validate: emailValidator })} className={styles.inputEmail} />
                        {errors.email && <p className={styles.errorText}>The email is invalid</p>}
                    </div>
                    <div className={styles.inputCont}>
                        <label className={styles.labelPassword}>Password</label>
                        <input type="password" {...register("password", { required: true, validate: passwordValidator })} className={styles.inputPassword} />
                        {errors.password && <p className={styles.errorText}>The password is invalid</p>}
                    </div>
                    <div className={styles.inputCont}>
                        <label className={styles.labelRepeatPassword}>Repeat Password</label>
                        <input type="password" {...register("repeatPassword", { required: true, validate: passwordValidator })} className={styles.inputRepeatPassword} />
                        {errors.password && <p className={styles.errorText}>The password is invalid</p>}
                    </div>
                    <input type="submit" className={styles.submit} />
                </form>
                <p className={styles.signUpLink}>¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a></p>
            </div>
        </div>
    )
}