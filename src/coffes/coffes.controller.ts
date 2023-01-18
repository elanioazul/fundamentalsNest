import { Controller, Get } from '@nestjs/common';

@Controller('coffes')
export class CoffesController {
  @Get('flavours')
  findAll() {
    return 'Thix action return all coffes';
  }
}
