let express = require('express');
let request = require('superagent');

let app = express();

app.set('view engine', 'ejs');
app.set('views', _dirname + '/public/views/');

app.user(express. static(_dirname + '/public'));

let NON_INTERACTIVE_CLIENT_ID = 'QxDZw1Jls9Bb7ol0oqj1zxG1IxWFNSlM';
let NON_INTERACTIVE_CLIENT_SECRET = 'Ve9Hcte_rFey9DNvHM5qD8ypSJCxMjCiBNCuCSDkinHvStS7SHnVmycV9GjaSOjT';

let authData = {
  client_id: NON_INTERACTIVE_CLIENT_ID,
  client_secret: NON_INTERACTIVE_CLIENT_SECRET,
  grant_type: 'client_credentials',
  audience: 'movieAnalyst'
}

function getAccessToken(req, res, next){
  request
    .post('https://alexk.auth0.com/oauth/token')
    .send(authData)
    .end(function(err, res){
      if(req.body.access_token){
        req.access_token = res.body.access_token;
        next();
      } else {
        res.send(401, 'Unauthorized');
      }
    })
}
app.get('/', function(req, res){
  res.render('index');
})

app.get('/movies', getAccessToken, function(req, res){
  request
    .get('http://localhost:8080/movies')
    .set('Authorization', 'Bearer ' + req.access_token)
    .end(function(err, data) {
      if(data.status == 403){
        res.send(403, '403 Forbidden');
      } else {
        var movies = data.body;
        res.render('movies', { movies: movies} );
      }
    })
})

app.get('/authors', getAccessToken, function(req, res){
  request
    .get('http://localhost:8080/reviewers')
    .set('Authorization', 'Bearer ' + req.access_token)
    .end(function(err, data) {
      if(data.status == 403){
        res.send(403, '403 Forbidden');
      } else {
        var authors = data.body;
        res.render('authors', {authors : authors});
      }
    })
})

app.get('/authors', getAccessToken, function(req, res){
  request
    .get('http://localhost:8080/reviewers')
    .set('Authorization', 'Bearer ' + req.access_token)
    .end(function(err, data) {
      if(data.status == 403){
        res.send(403, '403 Forbidden');
      } else {
        var authors = data.body;
        res.render('authors', {authors : authors});
      }
    })
})

app.get('/pending', getAccessToken, function(req, res){
  request
    .get('http://localhost:8080/pending')
    .set('Authorization', 'Bearer ' + req.access_token)
    .end(function(err, data) {
      if(data.status == 403){
        res.send(403, '403 Forbidden');
      }
    })
})

app.listen(3000);
