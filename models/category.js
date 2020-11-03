const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema;

const Catatory = new CategorySchema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },


})

const CatoryModel = mongoose.model('Category', Catatory);

module.exports = CatoryModel;