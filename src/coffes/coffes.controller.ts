import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	HttpCode,
	HttpStatus,
} from "@nestjs/common";

@Controller("coffes")
export class CoffesController {
	@Get("flavours")
	findAll() {
		return "Thix action return all coffes";
	}
	@Get(":id")
	findOne(@Param("id") id: string) {
		return `Thix action return ${id} coffe`;
	}
	@Post()
	@HttpCode(HttpStatus.GONE)
	create(@Body() body) {
		return body;
	}
}
