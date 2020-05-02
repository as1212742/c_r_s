const mongoose=require('mongoose')

const Schema=mongoose.Schema
const reviewSchema=new Schema(


    {
        
        
        
        rating1:{
            type:String,
            


        },
        rating2:{
            type:String,
            


        },
        rating3:{
            type:String,
            


        },
        rating4:{
            type:String,
            


        },
        rating5:{
            type:String,
            


        },
        net_Rating:
        {
            type:String,
            
        },
        student:
            {type:Schema.ObjectId,
                ref:"User"

           },

           course:{
            type:Schema.ObjectId,
            ref:"Course"
  
  
          }
          

    }
)
module.exports=mongoose.model('Review',reviewSchema)