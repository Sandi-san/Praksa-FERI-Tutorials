import { Comment } from "src/entities/comment.entity";
import { Topic } from "src/entities/topic.entity";
import { User } from "src/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    database: "testDBnest",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "limitbreaker",
    entities: [User,Topic,Comment],
    synchronize: true
};

export default config;