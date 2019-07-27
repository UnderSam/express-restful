var express = require('express');
var router = express.Router();
var conn = require('../connect');

/* GET */
router.get('/', function(req, res, next) {
  let db = conn.emit(false, 'testdb');
  qs = `select * from customer_info `;
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
  qs = `select * from customer_info where customer_id = '${req.params.id}'`;
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
   let customer_id = req.body.customer_id;
   let customer_name = req.body.customer_name;
   
   if( customer_id == undefined | customer_name == undefined ){
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
      .query(`select customer_id from customer_info where customer_id='${customer_id}'`)
      .then(data => {

         if(data.length === 0){
            db
            .query(` insert into customer_info (customer_id,customer_name) values ('${customer_id}','${customer_name}') `)
            .then(()=>{
                res.status(201).json({status:"Create",data:''})
            })
            .catch(err => {console.log(err)})
         }
         else{
            res_json.status_code = 422;
            res_json.datas.status = "Unprocessable Entity";
            res_json.datas.data = `customer_id:${customer_id} already exists !`;
            res.status(res_json.status_code).json(res_json.datas);
         }
      })
      .catch(err => {
        console.log(err);
      })
   }
});
router.patch('/:id',function(req,res){
  let customer_id = req.params.id;
  let customer_name = req.body.customer_name;
  let db = conn.emit(false, 'testdb');
  console.log(`patch ${customer_id} name to ${customer_name}`);

  db
  .query(/* Your Query here */)
  .then(data=>res.status(204).json({status:"resource updated successfully",data:""}))
  .catch(err=>res.status(400).json({status:"Bad Request",data:err}))
  
})
router.delete('/:id',function(req,res){
   let customer_id = req.params.id;
   let db = conn.emit(false, 'testdb');
   db
   .query(/* Your Query here */)
   .then(data=>res.status(204).json({status:"resource deleted successfully",data:""}))
   .catch(err=>res.status(400).json({status:"Bad Request",data:err}))
});


      
module.exports = router;

