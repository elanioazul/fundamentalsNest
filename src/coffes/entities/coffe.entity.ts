import { Entity } from "typeorm";
@Entity()
export class Coffe {
	id: number;
	name: string;
	brand: string;
	flavors: string[];
}
