var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports={
    GetAll: function(req,res){
        console.log('I am inside user controlle getall');
        User.find({userType:'User'},function(err,results){
            if(err) throw err;
            console.log('Found data going to display');
            res.render('adminHomePage',{user:results});
        })
    },
    create:function(req,res){
        if(!req.body){
            res.status(404).send({message:"Content can not be empty"});
            return;
        }
        //new user
        const user = new User({
            userType: req.body.userType,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phNo: req.body.phNo,
            address:req.body.address,
            email: req.body.email,
            allergic :req.body.status,
            gender: req.body.gender,
            userType : req.body.userType,
            userName: req.body.userName,
            pswd: req.body.pswd
        })
        //save user
        user.save(user)
            .then(data =>{
                if(user.userType=='Admin'){
                    var uType = 'User';
                    User.find({userType:uType},function(err,results){
                        if(err) throw err;
                        console.log('Found data going to display');
                        res.render('adminHomePage',{user:results});
                        console.log(results)
                    })
                }
                else{
                    res.render('vaccRegPage',{user:user});    
                }
            })
            .catch(err =>{
                res.status(500).send({
                    message: err.message || 'Some error occured while creation of new Vaccine receipient'
                });
            });
    },

    createVaccReg: function(req,res){
        if(!req.body){
            res.status(404).send({message:"Content can not be empty"});
            return;
        }
        //new user

        Date.prototype.addDays = function (days) {
            let date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
          }
          let date = new Date();
          console.log(date.addDays(60).toDateString());
          console.log("after displaying date")

        const myid= req.body.id;
        const user = {
            first_dose_date: req.body.datePicker,
            centreLoc:req.body.cityPicker,
            first_dose_status :"First dose scheduled",
            vacc_status :"First dose scheduled",
            second_dose_status :"First dose pending",
            second_dose_date :date.addDays(60).toDateString()
        }
        
         User.findByIdAndUpdate(myid,user,{new:true},function(err,results){
            if(err) throw err;
            res.render('vaccStatusReport',{user:results}); 
            console.log(results);
         })
    },
    userProfile:function(req,res){
        var userobj =  req.body.getprofile;
  
        User.findOne({_id:userobj},function(err,results){
            console.log(results);
            res.render('userProfile',{user:results});
        })
    },
    edituserProfile:function(req,res){
        var id = req.body.id;
        console.log(id)
        User.findOne({_id:id},function(err,results){
            // console.log(results)
            res.render('editUserProfile',{user:results});
        })
    },
    updateUserProfileInfo:function(req,res){
        var userid =  req.body.id;
        console
        const user = {
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            email :req.body.email,
            phNo :req.body.phNo,
            address :req.body.address
        }

        User.findByIdAndUpdate(userid,user,{new:true},function(err,results){
            if(err) throw err;
            res.render('userProfile',{user:results})
         })
    },
    updateUserProfile:function(req,res){
        var userid =  req.body.id;

        const user = {
            first_dose_date: req.body.datePicker,
            centreLoc:req.body.cityPicker,
            first_dose_status :"First dose scheduled",
            vacc_status :"First dose scheduled",
            second_dose_status :"First dose pending",
            second_dose_date :date.addDays(60).toDateString()
        }

        User.findByIdAndUpdate(myid,user,{new:true},function(err,results){
            if(err) throw err;
            console.log(results);
         })
    },
    showAddUserPage: function(req,res){
        // console.log("i am in showIndexPage controller");
        res.render('showAddUserPage');
    },
    showAddAdminPage:function(req,res){
        res.render('showAddAdminPage')
    },
    showUpdatePage:function(req,res){
        // console.log("i am in showIndexPage controller");
        res.render('updatePage');
    },
    showLoginPage:function(req,res){
        res.render('showLoginPage');
    },
    vaccStatusReport: function(req,res){
        
        res.render('vaccStatusReport');
    },

    logout: function(req,res){
        req.logout;
        res.render('showLoginPage');
    },
    adminUpdateVacStatus:function(req,res){
        const id =  req.body.id;
        User.findOne({_id:id},function(err,results){
         res.render('adminUpdateVacStatus',{user:results});
        })
     },
     searchUser:function(req,res){
         var fname = req.body.search;
         User.find({firstName:{'$regex': fname,$options:'i'}},function(err,results){
             res.render('adminHomePage',{user:results});
         })
     },
     updateFisrtVacRecord:function(req,res){
         const myid= req.body.id;
         var user = null;
         if(req.body.updatefdstatus=='Failed to report')
         {
              user = {
                 first_dose_status :req.body.updatefdstatus,
                 vacc_status :'Failed to report for first dose',
                 second_dose_status : 'cancelled'
             }
         }
         else{
              user = {
                 first_dose_status :req.body.updatefdstatus,
                 vacc_status :'First Dose Completed',
                 second_dose_status : 'awaiting'
             }
         }
        
          User.findByIdAndUpdate(myid,user,{new:true},function(err,results){
             if(err) throw err;
             res.render('adminUpdateVacStatus',{user:results}); 
             console.log(results);
          })
      },
      updateSecondVacRecord:function(req,res){
         const myid= req.body.id;
         var user = null;
         if(req.body.updatesdstatus=='Failed to report')
         {
             user = {
                 second_dose_status :req.body.updatesdstatus,
                 vacc_status :'Failed to Report for Second dose'
             }   
         }
         else
         {
             user = {
                 second_dose_status :req.body.updatesdstatus,
                 vacc_status :'Immunised'
             }
         }
          User.findByIdAndUpdate(myid,user,{new:true},function(err,results){
             if(err) throw err;
             res.render('adminUpdateVacStatus',{user:results}); 
             console.log(results);
          })
      },
    validatelogin:function(req,res){
        var userName = req.body.userName;
        var pwd = req.body.pswd;
        var userType = req.body.status;
        console.log(userType);
        User.findOne({userName:userName},function(err,results){
            if(!results || results.pswd != pwd || results.userType != userType){
                res.render('errorPage');
            }
            else
            {
                if(results.userType == 'Admin')
                {
                    var uType = 'User';
                    User.find({userType:uType},function(err,results){
                        if(err) throw err;
                        console.log('Found data going to display');
                        res.render('adminHomePage',{user:results});
                        console.log(results)
                    }) 
                }
                else
                {
                    console.log('I am user '+ results.userName + results.pswd);  
                    if(results.first_dose_date=='Not selected yet'){
                        res.render('vaccRegPage',{user:results});
                    }
                    else{
                        res.render('vaccStatusReport',{user:results});
                    }
                }
            }
        })
    },
    deleteUser:function(req, res){
        var delId = req.body.id2;
        User.deleteOne({_id:delId}).then(function(){
            console.log("deleted!")
            res.redirect('adminHomePage')
        }).catch(function(error){
            console.log(error); // Failure
        });
    }
}
