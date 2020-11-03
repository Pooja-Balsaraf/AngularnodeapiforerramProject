const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,

    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    token: {
        type: String,
        required: true
    }
});

const registerModel = mongoose.model('Register', UserSchema);
module.exports = registerModel;