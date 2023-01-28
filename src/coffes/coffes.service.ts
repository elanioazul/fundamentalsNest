import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Coffe } from "./entities/coffe.entity";
import { CreateCoffeeDto } from 'src/coffes/dto/create-coffee.dto'
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { Flavor } from "./entities/flavor.entity";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { Event } from '../events/entities/event.entity';
@Injectable()
export class CoffesService {
    constructor(
        @InjectRepository(Coffe)
        private readonly coffeRepository: Repository<Coffe>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
        private readonly dataSource: DataSource
      ) {}

    async findAll(paginationQuery: PaginationQueryDto) {
      const { limit, offset } = paginationQuery;
        return this.coffeRepository.find({
            relations: {
                flavors: true
            },
            skip: offset,
            take: limit
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
    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(flav => this.preloadFlavorByName(flav))
        )
        const coffe = this.coffeRepository.create({
            ...createCoffeeDto,
            flavors
        });
        return this.coffeRepository.save(coffe);
    }
    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const flavors =
        updateCoffeeDto.flavors &&
        (await Promise.all(
          updateCoffeeDto.flavors.map(flav => this.preloadFlavorByName(flav)),
        ));
  
      const coffee = await this.coffeRepository.preload({
        id: +id,
        ...updateCoffeeDto,
        flavors,
      });
      if (!coffee) {
        throw new NotFoundException(`Coffee #${id} not found`);
      }
      return this.coffeRepository.save(coffee);
    }
    async remove(id: string) {
        const coffeeIndex = await this.findOne(id);
        return this.coffeRepository.remove((coffeeIndex))
    }

    async recommendCoffee(coffee: Coffe) {
      const queryRunner = this.dataSource.createQueryRunner();
      
      await queryRunner.connect();
      await queryRunner.startTransaction(); 
      coffee.recommendations++;
    
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };
    
      await queryRunner.manager.save(coffee); 
      await queryRunner.manager.save(recommendEvent);

      try {
        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    }

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ where: { name } });
        if (existingFlavor) {
          return existingFlavor;
        }
        return this.flavorRepository.create({ name });
      }
}
