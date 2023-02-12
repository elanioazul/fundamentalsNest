import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query
} from "@nestjs/common";
import { UsePipes, UseFilters, UseGuards } from "@nestjs/common/decorators";
import { ValidationPipe } from "@nestjs/common/pipes";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { CoffesService } from "./coffes.service";
import { CreateCoffeeDto} from "./dto/create-coffee.dto";
import { UpdateCoffeeDto} from "./dto/update-coffee.dto";

@UsePipes(ValidationPipe)
@Controller("coffes")
export class CoffesController {
	constructor(private readonly coffesService: CoffesService){};
	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.coffesService.findAll(paginationQuery);
	}
	@Get(":id")
	findOne(@Param("id") id: number) {
		console.log(typeof id);
		return this.coffesService.findOne('' + id);
	}
	@Post()
	create(@Body() createCoffeDto: CreateCoffeeDto) {
		console.log(createCoffeDto instanceof CreateCoffeeDto);
		return this.coffesService.create(createCoffeDto)
	}
	@Patch(":id")
	update(@Param("id") id: string, @Body() UpdateCoffeeDto: UpdateCoffeeDto) {
		return this.coffesService.update(id, UpdateCoffeeDto);
	}
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.coffesService.remove(id)
	}
}
