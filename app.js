var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var todosRouter = require('./routes/todos');

var app = express();

var mongoose = require ('mongoose');
var User = require('./models/todos');

//connect to mongoose
mongoose.connect('mongodb://localhost/todos',{
  useNewUrlParser : true,
  useUnifiedTopology: true
},
  (err)=>{
    console.log('connected',err ? falsen : true, err)
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var User = require('./models/todos');

app.use('/', indexRouter);
app.use('/todos', todosRouter);

app.post('/todos',(req,res,next) =>{
  var todos = req.body;
  User.create(todos,(err,createdUser)=>{
      if(err) return next(err);
      res.redirect('/todos')
      //console(err,createdUser);
  })
});

app.get('/todos', (req,res,next)=>{
  User.find({}, (err,userList) => {
      if(err) return next(err);
      res.render('list', {users: userList});
  })
});

app.get('/todos/:id/delete', (req,res,next)=>{
  User.findByIdAndRemove(req.params.id, (err,userList) => {
      if(err) return next(err);
      res.redirect('/todos')
  })
})

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

module.exports = app;
