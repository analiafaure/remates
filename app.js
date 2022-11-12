var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
const https = require('https');
const cors = require('cors');
const helmet = require('helmet');
var compression = require('compression');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var remateRouter = require('./routes/remate');
var authRouter = require('./routes/authUsuario');
var loteRouter = require('./routes/lote');
var ofertaRouter = require('./routes/oferta');

var app = express();
app.use(helmet({contentSecurityPolicy: false}));  // Ayuda a proteger aplicaciones Express
app.use(compression());
app.use(cors());


const httpsServerOptions = {
  key: fs.readFileSync(process.env.KEY_PATH),
  cert: fs.readFileSync(process.env.CERT_PATH),
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/remate', remateRouter);
app.use('/auth', authRouter);
app.use('/lote', loteRouter);
app.use('/oferta', ofertaRouter);
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

//const serverHttp= http.createServer(app);
//serverHttp.listen(process.env.HTTP_PORT, process.env.IP);

// Servidor HTTPS
const serverHttps = https.createServer(httpsServerOptions, app);
serverHttps.listen(process.env.HTTPS_PORT, process.env.IP);
serverHttps.on('listening',()=>console.info( `Notes app running at https://${process.env.IP}:${process.env.HTTP_PORT} `)); 

app.use((req, res, next) => {
  if (req.secure) next(); else res.redirect(`https://${req.headers.host}${req.url}`);
});

module.exports = app;
