import express from "express";
import sequelize from "./config/database"; // Import the Sequelize instance
import clientRoutes from "./routes/clientRoutes";
import fundingSourceRoutes from "./routes/fundingSourceRoutes";
import { insertDefaultData } from "./utils/intitialiseDatabaseData";

const app = express();
const port = 8080;

app.use(express.json());

//setup cors for middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//check we have a connection to the database
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

//create the default funding sources if required
await insertDefaultData();

// Use routes
app.use("/api", clientRoutes);
app.use("/api", fundingSourceRoutes);

// Synchronize models with the database
sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
