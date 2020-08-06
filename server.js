const express = require('express')
var bodyParser = require('body-parser');
var axios = require('axios');
const app = express()
const port = 3001

var jsonParser = bodyParser.json()
 
bodyParser.urlencoded({ extended: false })

app.post('/api/search', jsonParser, (req, res) => {
    var query = `https://api.rawg.io/api/games?search=${req.body.searchFor}`;

    axios.get(query).then(response => {
        res.send(response.data);
    });
})

app.post('/auth/login', jsonParser, (req, res) => {
    console.log(req.body);
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))