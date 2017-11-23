var express = require('express'),
    employees = require('./routes/employees'),
    app = express();

app.use(express.static('adminchelsea'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});