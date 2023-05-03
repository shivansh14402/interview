const path = require("path");

const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoDBStore = require("connect-mongodb-session")(session);

const MONDODB_URI = "mongodb+srv://shivansh14402:Shivansh%4018@cluster0.h739hjk.mongodb.net/?retryWrites=true&w=majority";

const AuthRoutes = require("./routes/Auth");

const app = express();
const store = new mongoDBStore({
    uri: MONDODB_URI,
    collection: "sessions"
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.use(express.static(path.join(__dirname, "views")))
app.use(express.static(path.join(__dirname, "models")))

app.set("views", "views");
app.set("view engine", "ejs");

app.use(session({
    resave: false,
    saveUninitialized: false,
    store: store,
    secret: "mySecret"
}))

app.get("/", (req, res, next) => {

    res.render("index.ejs")
})

app.use("/auth", AuthRoutes)


app.listen(3000, (err) => {
    if (!err) {
        console.log("app is running on port 3000")
    }
})

mongoose.connect(MONDODB_URI)
.then((err) => {
    if (err) {
        console.log("connected")
    }
})