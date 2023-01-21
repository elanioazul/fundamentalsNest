import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import { CoffesService } from "./coffes.service";
import { CreateCoffeeDto} from "./dto/create-coffee.dto";
import { UpdateCoffeeDto} from "./dto/update-coffee.dto";

@Controller("coffes")
export class CoffesController {
	constructor(private readonly coffesService: CoffesService){};
	@Get()
	findAll(@Query() pagination) {
		return this.coffesService.findAll();
	}
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.coffesService.findOne(id);
	}
	@Post()
	create(@Body() createCoffeDto: CreateCoffeeDto) {
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
