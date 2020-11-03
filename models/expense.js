const mongoose = require('mongoose');
const expense = mongoose.Schema;

const expenseSchema = new expense({
    category: {
        type: String,
        required: true,
        trim: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    money: {
        type: Number,
        required: true,
        trim: true
    },

    Date: {
        type: Date,
        default: Date.now
    }
})

const expenseModel = mongoose.model('expense', expenseSchema);

module.exports = expenseModel;