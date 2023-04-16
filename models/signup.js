const mongoose=require("mongoose");
const bcrypt=require("bcrypt")

const db_url=process.env.DB_URL;

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false
    }
});

const User=mongoose.model("user",userSchema);


exports.addToSignup=(username,email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url).then(()=>{
            return User.findOne({email:email})
        }).then(user =>{
            if(user){
                reject("invalid email");
                mongoose.disconnect()
            }
            else{
                return bcrypt.hash(password , 10)
            }
        }).then((hidepassword)=>{
            let user=new User({
                username:username,
                email:email,
                password:hidepassword
            })
            return user.save();
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(()=>{
            mongoose.disconnect()
            reject()
        })
    })
}



exports.addToLogin=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url).then(()=>{
            return User.findOne({email:email})
        }).then(user =>{
            if(!user){
                mongoose.disconnect()
                reject("invalid email")
            }
            else{
                bcrypt.compare(password ,user.password).then(same=>{
                    if(!same){
                        mongoose.disconnect()
                        reject("invalid password")
                    }
                    else{
                        mongoose.disconnect()
                        resolve({
                            id:user._id,
                            isAdmin:user.isAdmin
                        });
                    }
                })
            }
        }).catch(()=>{
            mongoose.disconnect()
            reject("invalid email")
        })
    })
}