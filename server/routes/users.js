var express = require('express');
var router = express.Router();
const user = require('../models/users')
require('../util/util')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', function (req, res, next) {
  let userName = req.body.userName
  let userPwd = req.body.userPwd
  user.findOne({
    userName: userName,
    userPwd: userPwd
  }, function (err, doc) {
    if (doc) {
      res.cookie('userId', doc.userId, {
        path: '/', //放到跟路径下，不是子域名下，
        maxAge: 1000 * 60 * 60
      })
      res.cookie('userName', doc.userName, {
        path: '/', //放到跟路径下，不是子域名下，
        maxAge: 1000 * 60 * 60
      })
      res.json({
        status: 0,
        result: {
          userName: doc.userName
        }
      })
    } else {
      res.json({
        status: 1,
        msg: '用户名和密码不正确'
      })
    }
  })
});

router.post('/logout', function (req, res, next) {
  res.cookie('userId', '', {
    path: '/', //放到跟路径下，不是子域名下，
    maxAge: -1
  })
  res.cookie('userName', '', {
    path: '/', //放到跟路径下，不是子域名下，
    maxAge: -1
  })
  res.json({
    status: 0,
    msg: '',
    result: ''
  })
})

router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: 0,
      msg: '',
      result: req.cookies.userName
    })
  } else {
    res.json({
      status: 1,
      msg: '未登陆',
      result: ''
    })
  }
})


router.get('/cartList', async (req, res, next) => {
  let userId = req.cookies.userId
  let doc = await user.findOne({
    userId: userId
  })
  if (doc) {
    res.json({
      status: 0,
      msg: '',
      result: doc.cartList
    })
  } else {
    res.json({
      status: 1,
      msg: '未登陆',
      result: ''
    })
  }
})
router.post('/cartDel', async (req, res, next) => {
  let userId = req.cookies.userId
  let productId = req.body.productId
  let doc = await user.updateOne({
    userId: userId
  }, {
    $pull: {
      cartList: {
        productId: productId
      }
    }
  })
  if (doc) {
    res.json({
      status: 0,
      msg: '',
      result: ''
    })
  } else {
    res.json({
      status: 1,
      msg: '错误',
      result: ''
    })
  }
})

router.post('/cartEdit', async (req, res, next) => {
  let userId = req.cookies.userId,
    productId = req.body.productId,
    checked = req.body.checked,
    productNum = req.body.productNum
  let doc = await user.updateOne({
    userId: userId,
    'cartList.productId': productId
  }, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked,
  })
  if (doc) {
    res.json({
      status: 0,
      msg: '',
      result: 'suc'
    })
  } else {
    res.json({
      status: 0,
      msg: '错误啦',
      result: ''
    })
  }
})

router.post('/editCheckAll', async (req, res, next) => {
  let userId = req.cookies.userId
  let checkAll = req.body.checkAll
  let doc = await user.findOne({
    userId: userId
  })
  if (doc) {
    doc.cartList.forEach(item => {
      item.checked = checkAll
    });
    let resdoc = await doc.save()
    if (resdoc) {
      res.json({
        status: 0,
        msg: '',
        result: 'suc'
      })
    } else {
      res.json({
        status: 1,
        msg: '设置失败',
        result: ''
      })
    }
  }
})

router.get('/addressList', async (req, res, next) => {
  let userId = req.cookies.userId
  if (userId) {
    let userDoc = await user.findOne({
      userId: userId
    })
    if (userDoc) {
      res.json({
        status: 0,
        msg: '',
        result: userDoc.addressList
      })
    } else {
      res.json({
        status: 1,
        msg: '用户不存在',
        result: ''
      })
    }
  }
  router.post('/setDefault', async (req, res, next) => {
    let userId = req.cookies.userId
    let addressId = req.body.addressId
    let userdoc = await user.findOne({
      userId: userId
    })
    if (userdoc) {
      userdoc.addressList.forEach(item => {
        if (item.addressId == addressId) {
          item.isDefault = true
        } else {
          item.isDefault = false
        }
      })
      let doc = await userdoc.save()
      if (doc) {
        res.json({
          status: 0,
          msg: '',
          result: 'suc'
        })
      } else {
        res.json({
          status: 1,
          msg: '设置失败',
          result: ''
        })
      }
    }
  })
})


router.post('/delAddress', async (req, res, next) => {
  let userId = req.cookies.userId
  let addressId = req.body.addressId
  let doc = await user.updateOne({
    userId: userId
  }, {
    $pull: {
      addressList: {
        addressId: addressId
      }
    }
  })
  if (doc) {
    res.json({
      status: 0,
      msg: '',
      result: 'suc'
    })
  } else {
    res.json({
      status: 1,
      msg: '地址删除失败',
      result: ''
    })
  }
})

router.post('/payMent', async (req, res, next) => {
  let userId = req.cookies.userId
  let addressId = req.body.addressId
  let orderTotal = req.body.orderTotal
  let doc = await user.findOne({
    userId: userId
  })
  let address = '',
    goodsList = [];
  if (doc) {
    // 拿到用户的地址信息
    doc.addressList.forEach(item => {
      if (item.addressId == addressId) {
        address = item
      }
    })
    // 拿到用户购物商品
    doc.cartList.forEach(item => {
      if (item.checked === '1') {
        goodsList.push(item)
      }
    })

    let platform = '622'
    let r1 = Math.floor(Math.random() * 10)
    let r2 = Math.floor(Math.random() * 10);
    let sysDate = new Date().Format('yyyyMMddhhmmss');
    let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
    let orderId = platform + r1 + sysDate + r2
    let order = {
      orderId: orderId,
      orderTotal: orderTotal,
      addressInfo: address,
      goodsList: goodsList,
      orderStatus: '1',
      createDate: createDate
    }
    doc.orderList.push(order)
    let orderDoc = await doc.save()
    if (orderDoc) {
      res.json({
        status: 0,
        msg: '',
        result: {
          orderId: order.orderId,
          orderTotal: order.orderTotal
        }
      })
    } else {
      res.json({
        status: 1,
        msg: '用户不存在',
        result: ''
      })
    }
  }
})

router.get('/orderDetail', async (req, res, next) => {
  let userId = req.cookies.userId
  let orderId = req.query.orderId
  let doc = await user.findOne({
    userId: userId
  })
  if (doc) {
    var orderList = doc.orderList;
    if (orderList.length > 0) {
      let orderTotal = 0
      orderList.forEach(item => {
        if (item.orderId == orderId) {
          orderTotal = item.orderTotal
        }
      })
      if (orderTotal > 0) {
        res.json({
          status: 0,
          msg: '',
          result: {
            orderId: orderId,
            orderTotal: orderTotal
          }
        })
      } else {
        res.json({
          status: 120002,
          msg: '无此订单',
          result: ''
        })
      }

    } else {
      res.json({
        status: 120001,
        msg: '当前用户未创建订单',
        result: ''
      })
    }

  } else {
    res.json({
      status: 1,
      msg: '用户不存在',
      result: ''
    })
  }
})

module.exports = router;