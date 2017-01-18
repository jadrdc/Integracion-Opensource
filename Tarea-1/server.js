const express= require('express');
const app= express();
const route =require('./routes/main');
const ejs = require('ejs');
const ejsmate = require('ejs-mate');
const bodyparser=require('body-parser');
const  parameter =require('./config/globalparameter');
//Routes Import


app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));


app.use(route);
app.listen(parameter.port,function(req,resp)
{
  parameter.db.connect(parameter.connection);

  console.log('Hello World');
});
