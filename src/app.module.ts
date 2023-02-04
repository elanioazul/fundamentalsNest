import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffesModule } from './coffes/coffes.module';
import { CoffeRatingModule } from './coffe-rating/coffe-rating.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    CoffesModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // database host
      port: 5435, //  port exposed 
      username: 'postgres', // username
      password: 'pass123', // user password (same in docker-compose file)
      database: 'ilovecoffe', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically 
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }), 
    CoffeRatingModule, DatabaseModule
  ],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}
