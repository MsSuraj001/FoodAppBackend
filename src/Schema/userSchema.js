const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type : String,
        minlength: [5, "FirstName is required to minlength 5 letter"],
        required : true,
        trim: true,
        lowercase: true
    },

    lastName: {
        type : String,
        minlength: [5, "lastName is required to minlength 5 letter"],
        required : true,
    },
    mobileNumber :{
        type: String,
        minlength : [10, "Mobile no. is must be minimum 10 digit"],
        required : true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type: String,
        required: true,
        unique: true,
        minlength : [8, "Password is most required to 8 digit"]
    },
    role : {
        type : String,
        enum : ["USER", "ADMIN"],
        default : "USER",
    }
}, {timestamps: true, timeseries: true});


UserSchema.pre('save', async function(){
    // here u can modify your user before it is seved in mongodb
    this.hashedpassword =await bcrypt.hash(this.password, 10);
    this.password = this.hashedpassword;
})

const User = mongoose.model("Users", UserSchema);

module.exports =  User ;