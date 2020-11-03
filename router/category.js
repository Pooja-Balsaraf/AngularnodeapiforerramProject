const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const categoryModel = require('../models/category');
const CatoryModel = require('../models/category');

router.use(bodyparser.json());

router.post('/category', (req, res) => {
    const category = new categoryModel({
        title: req.body.title
    })

    category.save()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(404).json({
                error: err
            })
        })
})

router.put('/editcategory/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    categoryModel.findByIdAndUpdate({ _id: id }, req.body, { new: true }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
    })
})

router.delete('/deleteCategory/:id', (req, res) => {
    const id = req.params.id;
    categoryModel.deleteOne({ _id: id }, { new: true }).then(data => {
        res.status(200).json({
                title: 'Data Deleted Successfully'
            })
            .catch(err => {
                console.log(err);
            })
    })
})

router.get('/getcategory', (req, res) => {
    CatoryModel.find({}).then(data => {
        res.status(200).send(data);
    })

    .catch(err => {
        console.log(err);
    })
})


module.exports = router;