const mongoose=require('mongoose')

const Schema=mongoose.Schema
const courseSchema=new Schema(


    {
        
        name:{
            type:String,
            required:true

        },
        sem:
        {
            type:String
        },
        desc:{
            type:String

        },
        Faculty:{
            type:String,
           
        },
        Rating:{
            type:String,
            


        },
        Difficulty:{
            type:String,
            


        },
        
       
        
       
        Reviews:[
            {type:Schema.Types.ObjectId,
                ref:"Review"

            }
        ]

    }
)
module.exports=mongoose.model('Course',courseSchema)