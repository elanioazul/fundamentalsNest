import { Controller, Get } from '@nestjs/common';

@Controller('coffes')
export class CoffesController {
  @Get()
  findAll() {
    return 'Eyyy';
  }
}
