var express = require('express'),
  // employees = require('./routes/employees'),
  app = express();
var request = require('request');
var cheerio = require('cheerio');

app.use(express.static('adminchelsea'));



app.get('/api/v1', function(req, res, next) {

  request('http://www.chelseafc.com.vn/bang-xep-hang-premier-league.html', function(error, response, html) {
    if (!error && response.statusCode == 200) {
      console.log(html);
      var $ = cheerio.load(html);
      // res.send(html);

      // $('.dynamic_blocks')
      
      // .each(function(i, element){
      //   var a = $(this).prev();
      //   console.log(a.text());
      // });

    } else {
        console.log('error...');
    }
  });
});



app.get('/api/shows', function(req, res, next) {
  var query = Show.find();
  if (req.query.genre) {
    query.where({ genre: req.query.genre });
  } else if (req.query.alphabet) {
    query.where({ name: new RegExp('^' + '[' + req.query.alphabet + ']', 'i') });
  } else {
    query.limit(12);
  }
  query.exec(function(err, shows) {
    if (err) return next(err);
    res.send(shows);
  });
});

app.get('/api/shows/:id', function(req, res, next) {
  Show.findById(req.params.id, function(err, show) {
    if (err) return next(err);
    res.send(show);
  });
});










// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.get('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});