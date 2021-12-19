

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const jwt = require("jsonwebtoken");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();

//CORS
var cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT"
}

app.use(cors(corsOptions));


app.set('secretKey', "123456*s")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




//Validacion usuario logueado token
function validateUser(req,res,next)
{
  jwt.verify(req.headers['x-access-token'], req.app.get("secretKey"), function(err,decoded)
  {
    if(err){
      res.json({message: err.message})
    }
    else
    {
      console.log(decoded);
      req.body.tokenData=decoded;
      next();
    }
  })
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  
  //res.render('error');
  res.json({status:"error", mensaje: "Ha ocurrido un error"});
});

module.exports = app;
