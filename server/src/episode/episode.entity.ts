import { Character } from 'src/character/character.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Episode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @Column({length: 20})
    air_date: string;

    @Column({length: 20})
    episode: string;

    @ManyToMany(()=> Character, (character)=> character.episodes)
    characters: Character[];
}