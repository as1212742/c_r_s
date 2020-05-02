const mongoose=require('mongoose')

const Schema=mongoose.Schema
const reviewSchema=new Schema(


    {
        
        
        Course:{
          type:Schema.ObjectId,
          ref:"Course"


        }
        ,
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
        Student:
            {type:Schema.ObjectId,
                ref:"User"

            }
        

    }
)
module.exports=mongoose.model('Review',reviewSchema)