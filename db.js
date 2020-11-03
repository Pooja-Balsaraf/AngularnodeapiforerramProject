const mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/angularapi';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on("error", err => {
    console.log("err", err)
})


mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
})