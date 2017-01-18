const  router=require('express').Router();
const UserPayment = require('../models/employeepayment');
const fileController = require('fs');

router.get("/",function(req,resp)
{
  resp.render("frontpage");
});

router.post("/",function(req,resp)
{
UserPayment.find({} ,function (error , usersdata)
{
usersdata.each(function(err,data)
{
  console.log(data.Account);
});

});



  resp.render("frontpage",{message:"Se ha generado el archivo con exito"});
});


module.exports=router;
