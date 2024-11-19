import mongoose from 'mongoose'
import validator from 'validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Your Name'],
    maxLength: [30, 'Name Cannot Exceed 30'],
    minLength: [4, 'Name Should Have More than 4 Character']
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Email'],
    unique: true,
    validate: [validator.isEmail, 'Please Enter A Valid EMail']
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    minLength: [8, 'Name Should Have More than 8 Character'],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    default: 'user'
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt:{
    type:Date,
    default:Date.now()
  }

})

//Adding Encription to Password
userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password=await bcryptjs.hash(this.password,10);

})
//Adding JWT TOKEN to web
userSchema.methods.getJWTToken=function(){
  return jwt.sign({id:this._id},`adjajfajfaoHKKfleJFSKFLS`,{
    expiresIn:'5d'

  });
}
//Compare Password
userSchema.methods.comparePassword=async function(enteredPassword){
  return await bcryptjs.compare(enteredPassword,this.password);
}
//Genaratin Password Reset Token
userSchema.methods.getResetPasswordToken=function(){
  //Generating Token
  const resetToken=crypto.randomBytes(20).toString("hex");
  //Hasing and adding resetPasswordToken
  this.resetPasswordToken=crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

  this.resetPasswordExpires=Date.now()+15*60*1000;
  return resetToken;

}
const User = mongoose.model('User', userSchema)

export default User
