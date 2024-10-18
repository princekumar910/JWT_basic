const express = require('express') ;
const route = express.Router(); 
const {login , dashboard} = require('../controllers/main');


route.post('/login' , login ) ;

route.get('/dashboard' , dashboard);

module.exports = route ;