/**
 * Module dependencies.
 */
var express  = require('express');
var connect = require('connect');
var app      = express();
var port     = process.env.PORT || 3000;

// Configuration
app.use(express.static(__dirname + '/public'));
app.use(connect.cookieParser());
app.use(connect.logger('dev'));
app.use(connect.bodyParser());

app.use(connect.json());
app.use(connect.urlencoded());

// Routes

require('./routes/routes.js')(app);


app.listen(port);
console.log('The App runs on port ' + port);
