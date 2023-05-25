import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { initializeApp } from "firebase/app";
import {
    getAuth,
    //signInWithPopup,
    //GoogleAuthProvider,
    //signOut,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyChmubKNWq-XJd-ERD2v8R-HrPikLFJrsA",
    authDomain: "movies-5cf97.firebaseapp.com",
    projectId: "movies-5cf97",
    storageBucket: "movies-5cf97.appspot.com",
    messagingSenderId: "659474995814",
    appId: "1:659474995814:web:1078ff79f80a6b7e21eba7",
    measurementId: "G-006ZEGNNHM"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private usersRepo: Repository<Users>
    ) { }
    async signUpUser(name: string, lastname: string, username: string, email: string, password: string) {
        let userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        const userExists = this.usersRepo.findOne({ where: { email: email } });
        if (user && userExists) {
            this.createUser({
                uid: user.uid,
                name: name,
                lastname: lastname,
                username: username,
                email: user.email
            });
        }
        await updateProfile(user, { displayName: name + " " + lastname }).catch((err) => {
            throw new Error(err);
        });
        return "El usuario fue creado con éxito";
    }

    async createUser(body: any) {
        try {
            const newUser = this.usersRepo.create();
            newUser.id = body.uid;
            newUser.name = body.name;
            newUser.lastname = body.lastname;
            newUser.username = body.username;
            newUser.email = body.email;
            return await this.usersRepo.save(newUser);
        } catch (e) {
            throw new Error(e);
        }
    }
}
