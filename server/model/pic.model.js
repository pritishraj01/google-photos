import mongoose from "mongoose"

const picSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    }
},{timestamps:true})

const Picture= mongoose.model("Picture",picSchema)

export default Picture