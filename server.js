let express = require('express');
let request = require('superagent');

let app = express();

app.set('view engine', 'ejs');
app.set('views', _dirname + '/public/views/');

app.user(express. static(_dirname + '/public'));

let NON_INTERACTIVE_CLIENT_ID = 'YOUR-AUTHO-CLIENT-ID';
let NON_INTERACTIVE_CLIENT_SECRET = 'YOUR-AUTHO-CLIENT-SECRET';

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
