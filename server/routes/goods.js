var express = require('express');
var router = express.Router();
var mongoose = require('mongoose') //操作数据库
var goods = require('../models/goods') //加载模型表
mongoose.connect('mongodb://127.0.0.1:27017/dumall')
mongoose.connection.on('connected', function () {
    console.log('链接成功')
})

router.get('/', function (req, res, next) {
    // page pageSize  sort priceLevel 
    let priceLevel = req.param('priceLevel')
    let sort = req.param('sort')
    let pageSize = parseInt(req.param('pageSize'))
    let page = parseInt(req.param('page'))
    let params = {}
    let skip = (page - 1) * pageSize
    let priceGt = '',
        priceLte = '';
    if (priceLevel !== 'all') {
        switch (priceLevel) {
            case '0':
                priceGt = 0;
                priceLte = 100;
                break;
            case '1':
                priceGt = 100;
                priceLte = 500;
                break;
            case '2':
                priceGt = 500;
                priceLte = 1000;
                break;
            case '3':
                priceGt = 1000;
                priceLte = 5000;
                break;
        }
    }
    params = {
        salePrice: {
            $gt: priceGt,
            $lte: priceLte
        }
    }

    let goodsModel = goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({
        'salePrice': sort
    })
    goodsModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: 1,
                msg: err.message
            })
        } else {
            res.json({
                status: 0,
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})
module.exports = router