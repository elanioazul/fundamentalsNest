import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5435,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [],
    migrations: [],
  });