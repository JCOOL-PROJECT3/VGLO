var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/games";

const express = require('express')
var bodyParser = require('body-parser');
var axios = require('axios');
var mongoose = require('mongoose');
var db = require('./models/User');
const bcrypt = require('bcrypt');
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

app.post('/api/view', jsonParser, async (req, res) => {
    let data = await db.findOne({"username":req.body.user});
    res.send(data.games);
});

app.post('/api/add', jsonParser, async (req, res) => {
    let d = await db.updateOne({ "username": req.body.username }, { $addToSet: { "games": { "title": req.body.title, "platform": req.body.platform, "image":req.body.image } } }, {$unique: true, $upsert: true})
    let e = await db.updateOne({"username":req.body.username}, {$addToSet: { "platforms": req.body.platform} } );
    res.send({status: 'OK'});
});

app.post('/auth/login', jsonParser, async (req, res) => {
    let data = await db.find({"username":req.body.username}).lean();
    if (data.length == 0 || data[0].password != req.body.password){
        res.send({error: "Username and/or password incorrect"});
    } else {
        console.log(data);
        res.send({status: "OK", platforms: data[0].platforms});
    }
});

app.post('/auth/register', jsonParser, async (req, res) => {

    let data = await db.findOne({"username":req.body.user}).lean();
    if (!data) {
        let i = await db.create({"username":req.body.user, "password":req.body.pass});
    }
    res.send({status: 'OK'});
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))