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
        Rating1:{
            type:Number,
            


        },
        Rating2:{
            type:Number,
            


        },
        Rating3:{
            type:Number,
            


        },
        Rating4:{
            type:Number,
            


        },
        Rating5:{
            type:Number,
            


        },
        Net_Rating:
        {
            type:Number,
            
        },
        Reviews:[
            {type:Schema.Types.ObjectId,
                ref:"Review"

            }
        ]

    }
)
module.exports=mongoose.model('Course',courseSchema)