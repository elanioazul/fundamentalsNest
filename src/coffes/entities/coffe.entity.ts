import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Coffe {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	brand: string;

	@Column('json', {nullable : true})
	flavors: string[];
}
