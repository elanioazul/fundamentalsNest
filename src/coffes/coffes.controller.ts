import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	SetMetadata
} from "@nestjs/common";
import { Protocol } from "src/common/decorators/protocol.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { ParseIntPipe } from "src/common/pipes/parse-int.pipe";
import { CoffesService } from "./coffes.service";
import { CreateCoffeeDto} from "./dto/create-coffee.dto";
import { UpdateCoffeeDto} from "./dto/update-coffee.dto";


@Controller("coffes")
export class CoffesController {
	constructor(private readonly coffesService: CoffesService){};

	@Get()
	@Public()
	/*async*/ findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto) {
		//await new Promise(resolve => setTimeout(resolve, 5000));
		console.log(protocol);
		
		return this.coffesService.findAll(paginationQuery);
	}
	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		console.log(typeof id);
		console.log(id);
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
