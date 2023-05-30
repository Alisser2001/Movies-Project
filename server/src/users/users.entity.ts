import { UUID } from 'crypto';
import { Movies } from 'src/movies/movies.entity';
import { Series } from 'src/series/series.entity';
import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { Comments } from './interfaces';
import { Ratings } from './interfaces';

@Entity()
export class Users {
    @PrimaryColumn()
    id: UUID;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({type: 'jsonb', nullable: true})
    ratings: Ratings[];

    @ManyToMany(()=> Movies, (movie)=> movie.fans)
    @JoinTable()
    favoritesmovies: Movies[];

    @ManyToMany(()=> Series, (serie)=> serie.fans)
    @JoinTable()
    favoritesseries: Series[];

    @Column({ type: 'jsonb', nullable: true })
    comments: Comments[];
}