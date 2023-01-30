import { Module } from '@nestjs/common';
import { CoffesModule } from 'src/coffes/coffes.module';
import { CoffesService } from 'src/coffes/coffes.service';
import { CoffeRatingService } from './coffe-rating.service';

@Module({
  providers: [CoffeRatingService],
  imports: [CoffesModule]
})
export class CoffeRatingModule {
  constructor(private readonly coffeService: CoffesService) {}
}
