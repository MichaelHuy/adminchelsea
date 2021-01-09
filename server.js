var express = require('express'),
  // employees = require('./routes/employees'),
  app = express();
var request = require('request');
var cheerio = require('cheerio');
var Crisp = require("node-crisp-api")
let CrispClient = new Crisp();
const WEBSITE_ID = "xxxx";
CrispClient.authenticate('xxx', 'xxx');


app.use(express.static('adminchelsea'));



app.get('/api/v1', function async (req, res, next) {
  request('http://www.chelseafc.com.vn/bang-xep-hang-premier-league.html', function(error, response, html) {
    if (!error && response.statusCode == 200) {
      console.log("Ok fine");
      res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end('Hello World!\n');
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

const registerPeople = (res) => {
  CrispClient.websitePeople.createNewPeopleProfile(WEBSITE_ID, {
    email: 'lehuydit1@gmail.com',
    person: {
      nickname: 'Huy test',
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/000/135/345/small/new-year-icon-vector.jpg'
    },
    segments: ['dev', 'tenant:dev']
  })
  .then((data) => {
      console.info("Add Events successfully.", data);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      // Send back a response and end the connection
      res.end('Registered new people!\n');
    })
    .catch((error) => {
      console.error("Failed to register new people message:", error);
      res.end('Error!\n');
    });
}

const registerPeopleProfile = (res) => {
  CrispClient.websitePeople.addPeopleEvent(WEBSITE_ID, 'lehuydit1@gmail.com', {
    text: "Login-android",
    color: "blue",
    data: {
      tenant: 'marktenant',
      platform: 'android',
      timestamp: new Date().valueOf()
    }
  })
  .then((data) => {
      console.info("Add Events successfully.", data);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      // Send back a response and end the connection
      res.end('Hello World!\n');
    })
    .catch((error) => {
      console.error("Failed sending message:", error);
      // res.end('Error!\n');
      // Failed sending message: {
      //   reason: 'error',
      //   message: 'people_not_found',
      //   code: 404,
      //   data: {
      //     namespace: 'response',
      //     message: 'Got response error: people_not_found'
      //   }
      // }
      registerPeople(res)
    });
}

app.get('/api/v1/events', function async (req, res, next) {
  registerPeopleProfile(res)
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