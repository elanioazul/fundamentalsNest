import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffes')
export class CoffesController {
  @Get('flavours')
  findAll() {
    return 'Thix action return all coffes';
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Thix action return ${id} coffe`;
  }
}
