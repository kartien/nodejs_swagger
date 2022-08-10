const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");

const FileSync = require("lowdb/adapters/FileSync");
const { application } = require("express");

const adapter = new FileSync("db.json");
const db = low(adapter)

db.defaults({books: []}).write()

app.db = db;

app.use(cors())


