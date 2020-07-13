const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('./'));

app.post('/send-request', function (req, res) {
    console.log(req.body);
    setTimeout(() => {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        res.send(ip);
    }, 5000);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
