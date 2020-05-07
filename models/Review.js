const mongoose=require('mongoose')

const Schema=mongoose.Schema
const reviewSchema=new Schema(


    {
        
        
        
        rating1:{
            type:Number,
            


        },
        rating2:{
            type:Number,
            


        },
        rating3:{
            type:Number,
            


        },
        rating4:{
            type:Number,
            


        },
        rating5:{
            type:Number,
            


        },
        net_rating:
        {
            type:Number,
            
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