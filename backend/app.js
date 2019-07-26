var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var users = require("./routes/users");
var repositories = require("./routes/repositories");
var posts = require("./routes/posts");
var repository_comments = require("./routes/repo_comment");
var post_comments = require("./routes/post_comment");
var logs = require("./routes/webLog");
var enPage = require("./routes/enPage");

var bodyParser = require("body-parser");

var cors = require("cors");

var app = express();

// cors 부분 허용
var whitelist = ["70.12.246.138:8080"];

var corsOptions = {
    origin: function(origin, callback) {
        var isWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
};

app.use(cors(corsOptions));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// users REST API
app.use("/users", users);
app.use("/repositories", repositories);
app.use("/posts", posts);
app.use("/logs", logs);
app.use("/en", enPage);
app.use("/rcom", repository_comments);
app.use("/pcom", post_comments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
