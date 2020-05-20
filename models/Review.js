const mongoose=require('mongoose')

const Schema=mongoose.Schema
const reviewSchema=new Schema(


    {
        
        
        
        rating:{
            type:Number,
            


        },
        
        difficulty:{
            type:Number,
            


        },
        
        comment:{type:String,
            
        },
        student:
            {type:String

           },

           course:{
            type:String
  
  
          }
          

    }
)
module.exports=mongoose.model('Review',reviewSchema)