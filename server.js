require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

const sequelize = require("./config/database");

// Import Models
require("./models/user");
require("./models/Note");

// Routes
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("Backend Server Running");
});

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });

    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();