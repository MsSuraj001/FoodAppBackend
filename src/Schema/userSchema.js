const mongoose = require('mongoose');

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
        type: Number,
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
    }
})

const User = mongoose.model("Users", UserSchema);

module.exports = {
    User
}