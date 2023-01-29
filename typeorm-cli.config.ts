import { Coffe } from "src/coffes/entities/coffe.entity";
import { Flavor } from "src/coffes/entities/flavor.entity";
import { CoffeRefactor1674993279775 } from "src/migrations/1674993279775-CoffeRefactor";
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5435,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [Coffe, Flavor],
    migrations: [CoffeRefactor1674993279775],
  });