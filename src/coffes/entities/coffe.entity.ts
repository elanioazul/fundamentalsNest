import { Entity, PrimaryGeneratedColumn, Column, JoinTable } from "typeorm";
@Entity()
export class Coffe {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	brand: string;

	@JoinTable()
	flavors: string[];
}
