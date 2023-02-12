import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffesModule } from './coffes/coffes.module';
import { CoffeRatingModule } from './coffe-rating/coffe-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true, // models will be loaded automatically 
        synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
      })
    }), 
    ConfigModule.forRoot({
      load: [appConfig]
    }),
    CoffesModule, 
    CoffeRatingModule, DatabaseModule
  ],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}
