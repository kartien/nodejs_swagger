const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const Lowdb = require("lowdb");

const PORT = process.env.PORT || 3000;

const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = Lowdb(adapter);

db.defaults({ books: [] }).write();

const app = express();

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.listen(PORT, () => console.log(`The server is running at ${PORT}`));

