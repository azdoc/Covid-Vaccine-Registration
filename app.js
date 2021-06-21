var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var path = require('path');
var port = 8081;
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('shared'));
require('./models/userModel')

mongoose.connect('mongodb://localhost/ON_Vacc_DB', { useUnifiedTopology: true, useNewUrlParser: true },function(){
    console.log('Connected to the database');
});

var userController = require('./controllers/userController')



app.post('/adminUpdateVacStatus', userController.adminUpdateVacStatus);
app.get('/vaccStatusReport',userController.vaccStatusReport);//only to see in chrome
app.post('/addVaccRegInfo',userController.createVaccReg);
app.post('/userProfile',userController.userProfile);
app.post('/editUserProfile',userController.edituserProfile);
app.get('/showAddUserPage',userController.showAddUserPage);
app.post('/validatelogin',userController.validatelogin);
app.post('/searchUser',userController.searchUser);
app.get('/showAddAdminPage',userController.showAddAdminPage);
app.get('/logout',userController.logout);
app.get('/showLoginPage',userController.showLoginPage);
app.get('/adminHomePage', userController.GetAll);
app.get('/updatePage',userController.showUpdatePage);
app.post('/add',userController.create);
app.post('/updateFisrtVacRecord',userController.updateFisrtVacRecord);
app.post('/updateSecondVacRecord',userController.updateSecondVacRecord);
app.post('/updateUserProfile',userController.updateUserProfile);
app.post('/updateUserProfileInfo',userController.updateUserProfileInfo);
app.post('/deleteUser',userController.deleteUser);

app.listen(port)