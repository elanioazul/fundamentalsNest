import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { Coffe } from './entities/coffe.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Coffe])],
    controllers: [CoffesController],
    providers: [CoffesService]
})
export class CoffesModule {}
