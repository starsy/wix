let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mustacheExpress = require('mustache-express');

let indexRouter = require('./routes/index');
let downloadRouter = require('./routes/download');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/', indexRouter);
app.use('/download', downloadRouter);

module.exports = app;
