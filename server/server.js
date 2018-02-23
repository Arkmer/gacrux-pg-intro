const express = require('express');
const app = express();
let path = require('path');
const bodyParser = require('body-parser');
const port = 5000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setup songs router
const songRouter = require('./routers/songs-router.js');
app.use('/songs', songRouter);


// Setup our static files
app.use(express.static('server/public'));

app.listen(port, function(){
  console.log(`Listening on port ${port}.`);
})