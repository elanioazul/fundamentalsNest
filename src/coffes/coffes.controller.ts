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
	create(@Body() body) {
		return this.coffesService.create(body)
	}
	@Patch(":id")
	update(@Param("id") id: string, @Body() body) {
		return this.coffesService.update(id, body);
	}
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.coffesService.remove(id)
	}
}
