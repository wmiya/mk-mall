var express = require('express');
var router = express.Router();
const user = require('../models/users')

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


module.exports = router;