require("dotenv").config();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const ConnectDB = require('./db');
const session = require('express-session');
const { authenticate } = require('./middlewares/auth');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

const app = express();

// Set up mongoose connection
ConnectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session setup
var sess = {
  name: "user",
  genid: null,
  secret: process.env.SESSION_TOKEN,
  resave: true,
  saveUnitialized: true,
  authorized: false,
  cookie: { 
    expires: new Date(Date.now() + 3600000), // Current time + 1 hour
  }
}

if(app.get('env') === 'production')
{
  console.log("Using Production");
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}else{
  console.log("Using development");
}

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// routes
app.use('/', indexRouter);
app.use('/user', authenticate, userRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
