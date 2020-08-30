var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");

var mongoose = require("mongoose")
var app = express();

let {DATABASE_URL, PORT} = require('./config');


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let server;

function runServer(port, databaseUrl) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, response => {
            if (response) {
                return reject(response);
            }
            else {
                server = app.listen(port, () => {
                    console.log("App is running on port " + port);
                    resolve();
                })
                    .on('error', err => {
                        mongoose.disconnect();
                        return reject(err);
                    })
            }
        });
    });
}

function closeServer() {
    return mongoose.disconnect()
        .then(() => {
            return new Promise((resolve, reject) => {
                console.log('Closing the server');
                server.close(err => {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
}

runServer(PORT, DATABASE_URL);

module.exports = {app, runServer, closeServer};

