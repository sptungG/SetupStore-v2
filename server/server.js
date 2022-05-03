require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const { readdirSync } = require("fs");
// app
const app = express();
app.use(compression({ level: 6, threshold: 100 * 1000 }));
const http = require("http").createServer(app);

// db
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log("DB CONNECTION ERR", err));

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes middleware
readdirSync("./modules").map((r) => app.use("/api", require("./modules/" + r)));

// port
const port = process.env.PORT || 9090;
http.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
