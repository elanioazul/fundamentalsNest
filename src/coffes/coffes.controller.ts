import { Controller, Get, Param, Post, Body, Patch, Delete } from "@nestjs/common";

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
