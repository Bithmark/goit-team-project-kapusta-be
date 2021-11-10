const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./.env") });

const usersRouter = require("./routes/api/users");
const categoriesRouter = require("./routes/api/categories");
const transactionsRouter = require("./routes/api/transactions");
const sessionsRouter = require("./routes/api/sessions");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// временно закомментировано для беспроблемного подключения к базе

app.use("/api/users", usersRouter);
// app.use('/api/categories', categoriesRouter)
// app.use('/api/transactions', transactionsRouter)
// app.use('/api/sessions', sessionsRouter)
app.use("/link", (req, res) => {
  res.sendFile(path.join(__dirname, "./google/link.html"));
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not Found",
  });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({
    status: "error",
    code: status,
    message,
  });
});


module.exports = app;
