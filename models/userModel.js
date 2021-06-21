const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
     userType:{type:String,default:'User'},
     firstName:{type:String},
     lastName:{type:String},
     phNo:{type:Number},
     address:{type:String},
     email:{type:String},
     allergic:{type:String},
     gender:{type:String},

     userName:{type:String,required: false},
     pswd:{type:String,required: false},

    
     first_dose_date:{type:String, default:'Not selected yet'},
     centreLoc:{type:String,required: false, default:'Not selected yet'},

     vacc_status:{type:String,required: false, default:'No report yet'},
     first_dose_status:{type:String,required: false, default:'No report yet'},
     second_dose_date:{type:String,required: false, default:'Not selected yet'},
     second_dose_status:{type:String,required: false, default:'No Status yet'}
     
})

userSchema.path('userName').validate(async (userName)=>{
     const useridCount = await mongoose.models.User.countDocuments({userName});
     return !useridCount;
},'UserId already exists');

userSchema.path('email').validate(async (email)=>{
     const emailCount = await mongoose.models.User.countDocuments({email});
     return !emailCount;
},'Email id already exists');

const usermodel = mongoose.model('User', userSchema);
module.exports = usermodel;