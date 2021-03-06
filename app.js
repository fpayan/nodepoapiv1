const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compress = require('compression');
const verifyToken = require('./middlewares/middleware_verifyToken');
const i18next = require('./middlewares/middleware_i18n');
const index = require('./routes/index');
const users = require('./routes/users');

const app = express();
// Environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
  app.use(compress());
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Load Connect DB
require('./lib/connectMongoose');

// i18next for all request
app.use(i18next.i18nextMiddleware);

// Controllers
require('./controllers/users.controller');
require('./controllers/announces.controller');

// Routers
require('./routes/apiv1/users.router')(app);
require('./routes/apiv1/announces.router')(app);

require('./routes/login.router')(app);
require('./routes/singup.router')(app);

// Verify which in router 'apiv1' always have token
app.use('/apiv1', verifyToken());
//app.use('/apiv2', userController.requiresLogin);

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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

module.exports = app;
