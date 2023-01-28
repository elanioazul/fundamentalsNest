import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Coffe } from "./entities/coffe.entity";
import { CreateCoffeeDto } from 'src/coffes/dto/create-coffee.dto'
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { Flavor } from "./entities/flavor.entity";

@Injectable()
export class CoffesService {
    constructor(
        @InjectRepository(Coffe)
        private readonly coffeRepository: Repository<Coffe>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
      ) {}

    async findAll() {
        return this.coffeRepository.find({
            relations: {
                flavors: true
            }
        });
    }
    async findOne(id: string) {
        const coffe = this.coffeRepository.find({
             where:{ id: +id},
             relations: {
                flavors: true
             }
            });
        if (!coffe) {
            throw new NotFoundException(`Coffe ${id} is not found in db`)
        }
        return coffe;
    }
    create(createCoffeeDto: CreateCoffeeDto) {
        const cofe = this.coffeRepository.create(createCoffeeDto);
        return this.coffeRepository.save(cofe);
    }
    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const existingCoffee = await this.coffeRepository.preload({
            id: +id,
            ...updateCoffeeDto
        })
        if (!existingCoffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
          }
        return this.coffeRepository.save(existingCoffee);
    }
    async remove(id: string) {
        const coffeeIndex = await this.findOne(id);
        return this.coffeRepository.remove((coffeeIndex))
    }
}
