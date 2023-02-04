import { Module } from '@nestjs/common';
import { CoffesModule } from 'src/coffes/coffes.module';
import { CoffesService } from 'src/coffes/coffes.service';
import { DatabaseModule } from 'src/database/database.module';
import { CoffeRatingService } from './coffe-rating.service';

@Module({
  providers: [DatabaseModule, CoffeRatingService],
  imports: [CoffesModule]
})
export class CoffeRatingModule {
  constructor(private readonly coffeService: CoffesService) {}
}
