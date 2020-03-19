const express = require('express')
const router = express.Router()
const goods = require('../models/goods')

router.get('/', async (req, res, next) => {
    let page = parseInt(req.param('page'))
    let pageSize = parseInt(req.param('pageSize'))
    let sort = req.param('sort')
    let priceLevel = req.param('priceLevel')
    let skip = (page - 1) * pageSize
    let params = {}
    let priceGt = '',
        priceLte = '';
    if (priceLevel !== 'all') {
        switch (priceLevel) {
            case '0':
                priceGt = 0
                priceLte = 100
                break
            case '1':
                priceGt = 100
                priceLte = 500
                break
            case '2':
                priceGt = 500
                priceLte = 1000
                break
            case '3':
                priceGt = 1000
                priceLte = 5000
                break
        }
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }
    let goodsModel = goods.find(params).skip(skip).limit(pageSize)
    goodsModel.sort({
        'salePrice': sort
    })
    let doc = await goodsModel.exec()
    res.json({
        status: 0,
        msg: '',
        result: {
            count: doc.length,
            list: doc
        }
    })

})


module.exports = router