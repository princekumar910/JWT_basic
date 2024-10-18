const express = require('express') ;
const route = express.Router(); 
const {login , dashboard} = require('../controllers/main');
const {authenticationMiddleware} = require('../middleware/auth')

route.post('/login' , login ) ;

route.get('/dashboard' , authenticationMiddleware ,dashboard);

module.exports = route ;