import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { COFFE_BRANDS } from './coffes.constants';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { Coffe } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeBrandsFactory {
  create() {
    return ['mocked', 'bitter'];
  }
}
@Module({
    imports: [TypeOrmModule.forFeature([Coffe, Flavor, Event])],
    controllers: [CoffesController],
    providers: [
        CoffesService,
        CoffeBrandsFactory,
        { 
            provide: COFFE_BRANDS, 
            useFactory: (brandsCoffe: CoffeBrandsFactory) => brandsCoffe.create(),
            inject: [CoffeBrandsFactory]
         }
    ],
    exports: [CoffesService]
})
export class CoffesModule {}
