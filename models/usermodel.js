const mongoose = require('mongoose');
const schema = mongoose.Schema;
const jwt=require('jsonwebtoken');
const userSchema = new schema({
    email:
    {
        type: String,
        required: true,
        unique: true,
        sparse:true  //make a null entry allowed first time i.e dont compare many nulls as same
    },
    password: {
        type: String,
        required: true
    },
    isadmin:{
        type:Boolean,
        default:false
    },
    tokens:[
        {
            token:{ 
                type:String,
                required:true
            }
        }
    ] 
});

userSchema.methods.generateauthtoken = async function(){
    //whenever use async await to handle errors use try catch
    try{
        const token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});  //to add the token to tokens array
        await this.save(); //to save token into db
        return token;
    }catch(e){
            console.log("-------------------------\nError in generating token = ",e);
    }
} //method is called when we are working with an instance of model

module.exports=mongoose.model('user',userSchema);