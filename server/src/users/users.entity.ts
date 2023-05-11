import { UUID } from 'crypto';
import { Movies } from 'src/movies/movies.entity';
import { Series } from 'src/series/series.entity';
import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { Comments } from './interfaces';

@Entity()
export class Users {
    @PrimaryColumn()
    id: UUID;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    ratings: string;

    @ManyToMany(()=> Movies, (movie)=> movie.fans)
    @JoinTable()
    favoritesmovies: Movies[];

    @ManyToMany(()=> Series, (serie)=> serie.fans)
    @JoinTable()
    favoritesseries: Series[];

    @Column({ type: 'jsonb' })
    comments: Comments[];
}