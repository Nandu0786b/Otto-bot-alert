import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        max:25,
        min:2,
        require:true
    },
    email:{
        type:String,
        max:50,
        min:4,
        require:true,
        unique:true
    },
    pass:{
        type:String,
        max:20,
        min:7
    },
    pushEnable:{
        type:Boolean,
        require:true,
        default:false
    },
    pushToken:{
        type:String,
        default:''
    }

},
{
    timestamps: true,
    versionKey: '__v', // Enable versioning
})

mongoose.pluralize(null);
const user = mongoose.model("User", userSchema);
export default user;