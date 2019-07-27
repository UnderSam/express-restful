var express = require('express');

var api_router = express.Router();
var userRouter = require('./member/user');
var itemRouter = require('./product/item');
var orderRouter = require('./order/order');

api_router.use('/user',userRouter);
api_router.use('/item',itemRouter);
api_router.use('/order',orderRouter);

module.exports = api_router;