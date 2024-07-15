const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();

var menuController = require('../src/app/controllers/menuController');
var footerController = require('../src/app/controllers/footerController');


const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//cài đặt view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//cài đặt route
app.use(menuController.renderMenu) //render menu vào các trang
app.use(footerController.renderFooter) //render footer vào các trang
route(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log('Server run on http://localhost:'+PORT));

