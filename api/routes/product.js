const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../model/product');
const product = require('../model/product');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth,(req, res, next) => {
    Product.find()
        .then(result => {
            res.status(200).json({
                ProductData: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})
router.get('/:id', (req, res, next) => {
    Product.find({_id: req.params.id })
        .then(result => {
            res.status(200).json({
                ProductData: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})


router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender
    })

    product.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                newProduct: result
            })
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

//delete request
router.delete('/:id', (req, res, next) => {
    product.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'product deleted',
                result: result
            })

            console.log('product deleted successfully');
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

//put request

router.put('/:id', (req, res, next) => {
    console.log(req.params.id);
    Product.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_product:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router;






module.exports = router;