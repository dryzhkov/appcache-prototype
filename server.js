var express = require('express');
var path = require('path');
var app  = express();

app.use(express.static('statics'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/statics/index.html'));
});

app.get('/modules.appcache', function(req, res) {
    console.log('sending cache back');
    res.setHeader('Content-Type', 'text/cache-manifest');
    res.sendFile('modules.appcache', { root: path.join(__dirname, '/public') });
});

app.listen(8080, () => console.log('Example app listening on port 8080!'))