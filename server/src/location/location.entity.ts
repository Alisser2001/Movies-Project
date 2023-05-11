import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Character } from 'src/character/character.entity';

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50, nullable: true})
    name: string;

    @Column({length: 50, nullable: true})
    type: string;

    @Column({length: 50, nullable: true})
    dimension: string;

    @OneToMany(()=> Character, (character)=> character.location)
    residents: Character
}