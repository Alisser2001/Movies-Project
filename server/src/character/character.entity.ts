import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Location } from 'src/location/location.entity';
import { Episode } from 'src/episode/episode.entity';

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50, unique: true })
    name: string;

    @Column({length: 50, nullable: true})
    status: string;

    @Column({length: 50, nullable: true})
    species: string;

    @Column({length: 50, nullable: true})
    type: string;

    @Column({length: 50, nullable: true})
    gender: string;

    @Column({length: 100, nullable: true})
    origin: string;

    @Column({length: 100, nullable: true})
    img: string;

    @ManyToOne(()=> Location, (location)=> location.residents)
    location: Location

    @ManyToMany(()=> Episode)
    @JoinTable()
    episodes: Episode[]
}