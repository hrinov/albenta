const knex = require("knex");
require("dotenv").config();

const db = knex({
  client: "postgres",
  connection: {
    host: "ep-patient-mountain-45778944.us-east-2.aws.neon.tech",
    user: "ruslan.hrinov",
    password: "wgX0xen2NuGD",
    // password: process.env.DB_PASSWORD,
    port: 5432,
    database: "dafault",
    ssl: "true",
    sslmode: "require",
  },
});

export { db };
