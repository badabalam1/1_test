const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('./schema');
db.mongoConnect();
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('./lib/passport');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(session({
    secret: 'JDSF@Y*@T93QEI5WDS3VX3C',
    resave: 'false',
    saveUninitialized: 'true',
    store: new MongoStore({mongooseConnection : mongoose.connection}),
}));  
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.req = req;
    res.locals.res = res;
    next();
});

const routes = require('./routes');

app.set("port", process.env.PORT || 3001);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', routes);

app.use((req, res, next) => {
    res.status(404).send('Sorry can\'t find that!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(app.get("port"),function(){
    console.log("✓ Server started on port "+ app.get("port"));
});