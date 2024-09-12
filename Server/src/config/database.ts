import { Sequelize } from "sequelize";

//setup the database connection
const sequelize = new Sequelize("clientdb", "user", "user_password", {
  host: "db",
  dialect: "mysql",
});

export default sequelize;
