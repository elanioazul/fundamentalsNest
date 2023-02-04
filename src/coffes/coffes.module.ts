import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { DataSource } from 'typeorm/data-source/DataSource';
import { COFFE_BRANDS } from './coffes.constants';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { Coffe } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';

// @Injectable()
// export class CoffeBrandsFactory {
//   create() {
//     return ['mocked', 'bitter'];
//   }
// }
@Module({
    imports: [TypeOrmModule.forFeature([Coffe, Flavor, Event])],
    controllers: [CoffesController],
    providers: [
        CoffesService,
        // Asynchronous "useFactory" (async provider example)
        {
            provide: COFFE_BRANDS,
            // Note "async" here, and Promise/Async event inside the Factory function 
            // Could be a database connection / API call / etc
            // In our case we're just "mocking" this type of event with a Promise
            useFactory: async (connection: DataSource): Promise<string[]> => {
            // const coffeeBrands = await connection.query('SELECT * ...');
            const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
            console.log('asyncf factory function happens before data is delivered');
            
            return coffeeBrands;
            },
            inject: [DataSource],
        },
    ],
    exports: [CoffesService]
})
export class CoffesModule {}
