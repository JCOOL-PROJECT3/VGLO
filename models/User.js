const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        unique: false
    },

    games: [{
        title: String,
        platform: String,
        image: String,
    }, { unique: true, upsert: true}],
    platforms:[{
        type:String, trim: true, unique: true
    }]
});

var User = mongoose.model("users", UserSchema);

module.exports = User;