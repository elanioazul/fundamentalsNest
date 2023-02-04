import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Module({
    providers: [
        {
            provide: 'CONNECTION',
            useValue: new DataSource({
                type: 'postgres',
                host: 'localhost',
                port: 5432
            }).initialize()
        }
    ]
})
export class DatabaseModule {}
