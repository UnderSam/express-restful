var express = require('express');
var router = express.Router();
var conn = require('../connect');

/* GET */
router.get('/', function(req, res, next) {
  let db = conn.emit(false, 'testdb');
  qs = `select * from product_info `;
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
  let db = conn.emit(false, 'testdb');
  qs = `select * from product_info where product_id = '${req.params.id}'`;
  db
   .query(qs)
   .then(data => {
      res.status(200).json({status:"OK",data:data});
   })
   .catch(err => {
      res.status(400).json({status:"Bad Request",data:err});
   })
});
/* POST */
router.post('/',function(req,res){
   let product_id = req.body.product_id;
   let product_name = req.body.product_name;
   let product_price = req.body.product_price;
   
   if( product_id == undefined | product_name == undefined ){
     res.status(400).json({status:"Bad Request",data:'Wrong format of post body'});
   }else{
      let db = conn.emit(false, 'testdb');
      let res_json = {
        status_code : 0,
        datas : {
          status : "",
          data : ""
        }
      }
      db
      .query(`select product_id from product_info where product_id='${product_id}'`)
      .then(data => {

         if(data.length === 0){
            db
            .query(` insert into product_info (product_id,product_price,product_name) values ('${product_id}','${product_price}','${product_name}') `)
            .then(()=>{
                res.status(201).json({status:"Create",data:''})
            })
            .catch(err => {console.log(err)})
         }
         else{
            res_json.status_code = 422;
            res_json.datas.status = "Unprocessable Entity";
            res_json.datas.data = `product_id:${product_id} already exists !`;
            res.status(res_json.status_code).json(res_json.datas);
         }
      })
      .catch(err => {
        console.log(err);
      })
   }
});

      
module.exports = router;

