const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const route = require('./routes/product');
const app = express();
// const db = require('./config/db');
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);


app.get('/', function(req,res){
  res.render('home');
});

app.get('/gioi-thieu', function(req,res){
  res.render('introduce');
});
app.get('/san-pham', function(req,res){
  res.render('listProduct');
});
app.get('/chi-tiet-san-pham', function(req,res){
  res.render('productDetail');
});

app.listen(PORT,()=>console.log('Server run on http://localhost:'+PORT));


// //Delete chi tiet san pham
// app.delete('/san-pham/:id',(req,res)=>{
//   mysqlConnection.query('DELETE FROM tbl_sanpham WHERE sanpham_id = ?',[req.params.id],(err, rows, fields)=>{
//     if(!err)
//       res.send('Deleted successfully');
//     else
//     console.log(err);
//   })
// });