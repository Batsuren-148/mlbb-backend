const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require("config");
const colors = require("colors");
const parser = require("body-parser");
const cors = require("cors");

// ------ controller -------
// const appController = require("./controllers/appController");
// ------ middleware -------
const isAuth = require("./middleware/is-auth");
// ------ connection mongodb ------
const connectDB = require("./config/db");
const mongoURI = config.get("mongoURI");
// ------- routers -------
const indexRouter = require("./routes/indexRouter");
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const heroesRouter = require("./routes/heroRouter");

const app = express();
app.use(cors());
connectDB();

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};

const store = new MongoDBStore({
    uri: mongoURI,
    collection: "mySessions",
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/static", express.static("public"));

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 10000000,
        },
    })
);

//===== Routes ======
app.use(["/", "index"], indexRouter);
app.use("/login", loginRouter);
app.use("/heroes", heroesRouter);
app.use("/register", cors(corsOptions), registerRouter);

app.listen(8000, console.log("App Running on http://localhost:8000"));
