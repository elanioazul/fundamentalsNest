import { CoffeRefactor1674993279775 } from "src/migrations/1674993279775-CoffeRefactor";
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5435,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [],
    migrations: [CoffeRefactor1674993279775],
  });