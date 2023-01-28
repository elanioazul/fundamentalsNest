import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Flavor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string
}
