const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const Lowdb = require("lowdb");
const booksRouter = require("../routes/index.routes");

const PORT = process.env.PORT || 3000;

const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = Lowdb(adapter);

db.defaults({ books: [] }).write();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Api books",
            version: "0.0.1",
            description: "Books for programming languages"
        },
        servers : [
            {
                url: "http://localhost:3000"
            }
        ],
    },
    apis: ["../routes/*.js"]
}

const specs = swaggerJsDoc(options)

const app = express();

app.use("/api", swaggerUI.serve, swaggerUI.setup(specs))

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/books", booksRouter);

app.listen(PORT, () => console.log(`The server is running at ${PORT}`));
