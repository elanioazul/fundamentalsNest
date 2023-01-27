import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Coffe } from "./entities/coffe.entity";

@Injectable()
export class CoffesService {
    private coffes:Coffe[] = [
        {
            id: 1,
            name: "Oh rico rico",
            brand: "Mazilla",
            flavors: ['mezcla', 'torrefacto']
        },
        {
            id: 2,
            name: "Oh La ostia",
            brand: "Nestle",
            flavors: ['mezcla', 'torrefacto']
        }
    ];

    findAll() {
        return this.coffes;
    }
    findOne(id: string) {
        const coffe = this.coffes.find(item => item.id === +id);
        if (!coffe) {
            throw new NotFoundException(`Coffe ${id} is not found in db`)
        }
        return coffe;
    }
    create(createCoffeeDto: any) {
        this.coffes.push(createCoffeeDto);
        return createCoffeeDto;
    }
    update(id: string, updateCoffeeDto: any) {
        const existingCoffee = this.findOne(id);
        if (existingCoffee) {
          // update the existing entity
        }
    }
    remove(id: string) {
        const coffeeIndex = this.coffes.findIndex(item => item.id === +id);
        if (coffeeIndex >= 0) {
          this.coffes.splice(coffeeIndex, 1);
        }
    }
}
