const mongoose=require('mongoose')

const Schema=mongoose.Schema

const professorSchema=new Schema(


    {
        
        name:{
            type:String,
            required:true

        },
        prof_id:
        {
            type:String,
            required:true
        },
        pass:
        {
            type:String,
            required:true
        },
        contact:
        {
            type:String
        },
        department:
        {
            type:String
        },
        Courses:[
            {type:Schema.Types.ObjectId,
                ref:"Course"

            }
        ]

    }
)
module.exports=mongoose.model('Professor',professorSchema)