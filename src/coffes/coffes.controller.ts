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

@Controller("coffes")
export class CoffesController {
	@Get("flavours")
	findAll(@Query() pagination) {
		const { limit, offset } = pagination;
		return `Thix action return all coffes. Limit is ${limit} and offset is: ${offset}`;
	}
	@Get(":id")
	findOne(@Param("id") id: string) {
		return `Thix action return ${id} coffe`;
	}
	@Post()
	create(@Body() body) {
		return body;
	}
	@Patch(":id")
	update(@Param("id") id: string, @Body() body) {
		return `Thix action updates ${id} coffe`;
	}
	@Delete(":id")
	remove(@Param("id") id: string) {
		return `Thix action remobes ${id} coffe`;
	}
}
