var express = require('express');
var router = express.Router();
var conn = require('../connect');

router.get('/', function(req, res, next) {
    let db = conn.emit(false, 'test_db');
    qs = `SELECT customer_name,product_name,order_value,product_price,order_date FROM order_info JOIN customer_info JOIN product_info WHERE order_info.customer_id = customer_info.customer_id AND order_info.product_id = product_info.product_id`;
    db
     .query(qs)
     .then(data => {
        res.status(200).json({status:"OK",data:data});
     })
     .catch(err => {
        res.status(400).json({status:"Bad Request",data:err});
     })
  });
  /* GET ID*/
router.get('/:id', function(req, res, next) {
    let db = conn.emit(false, 'test_db');
    qs = `SELECT customer_name,product_name,order_value,product_price,order_date FROM order_info JOIN customer_info JOIN product_info WHERE order_info.customer_id = customer_info.customer_id AND order_info.product_id = product_info.product_id and order_number = '${req.params.id}'`;
    db
     .query(qs)
     .then(data => {
        res.status(200).json({status:"OK",data:data});
     })
     .catch(err => {
        res.status(400).json({status:"Bad Request",data:err});
     })
  });

  module.exports = router;