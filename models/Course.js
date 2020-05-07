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
            type:String,
            


        },
        Rating2:{
            type:String,
            


        },
        Rating3:{
            type:String,
            


        },
        Rating4:{
            type:String,
            


        },
        Rating5:{
            type:String,
            


        },
        Net_Rating:
        {
            type:String,
            
        }
        ,
        Reviews:[
            {type:Schema.Types.ObjectId,
                ref:"Review"

            }
        ]

    }
)
module.exports=mongoose.model('Course',courseSchema)