import { User } from "src/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    database: "testDBnest",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "limitbreaker",
    entities: [User],
    synchronize: true
};

export default config;