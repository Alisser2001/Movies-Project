import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Rating } from './interfaces';
import { Users } from 'src/users/users.entity';

@Entity()
export class Series {
    @PrimaryColumn()
    imdbid: string;

    @Column()
    title: string;

    @Column()
    year: string;

    @Column()
    rated: string;

    @Column()
    released: string;

    @Column()
    runtime: string;

    @Column()
    genre: string;

    @Column()
    director: string;

    @Column()
    writer: string;

    @Column()
    actors: string;

    @Column()
    plot: string;

    @Column()
    language: string;

    @Column()
    country: string;

    @Column()
    awards: string;

    @Column()
    poster: string;

    @Column({ type: 'jsonb', nullable: true })
    ratings: Rating[];

    @Column()
    metascore: string;

    @Column()
    imdbrating: string;

    @Column()
    imdbvotes: string;

    @Column({ nullable: true })
    seasons: string;

    @ManyToMany(()=> Users, (user)=> user.favoritesmovies)
    fans: Users[];
}