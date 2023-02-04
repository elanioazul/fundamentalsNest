import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { Coffe } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';

class MockCoffeService {}
class prodConfigCoffeService {}
class devConfigCoffeService {}
@Module({
    imports: [TypeOrmModule.forFeature([Coffe, Flavor, Event])],
    controllers: [CoffesController],
    providers: [
        { provide: CoffesService, useClass: process.env.NODE_ENV === 'development' ? devConfigCoffeService : prodConfigCoffeService}
        // { provide: CoffesService, useValue: new MockCoffeService }
    ],
    exports: [CoffesService]
})
export class CoffesModule {}
