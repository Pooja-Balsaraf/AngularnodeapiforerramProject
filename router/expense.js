const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const expenseModel = require('../models/expense');

router.use(bodyParser.json());


router.post('/expense', (req, res) => {
    console.log(req.body);
    const expense = new expenseModel(req.body);
    expense.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
        })
})

router.put('/editexpense/:id', (req, res) => {
    const id = req.params.id;
    console.log('Expense id', id);
    expenseModel.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
            console.log(err);
        })
})

router.delete('/deleteexpense/:id', (req, res) => {
    const id = req.params.id;
    console.log('Delete Expense', id);
    expenseModel.deleteOne({ _id: id }, { new: true }).then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
})


router.get('/getExpenses', (req, res) => {
    expenseModel.find({}).then(data => {
        res.status(200).send(data)
    })

    .catch(err => {
        console.log(err);
        res.status(404).send({
            err: err
        })
    })
})

module.exports = router;