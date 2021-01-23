const mongoose  = require('mongoose');
const {Schema}= mongoose
const blogSchema = new Schema({
     title:{
         type:String,
         required:[true,'title is required'],
         minlength:2,
     },
     body:{
        type:String,
        minlength:8,
        required:[true,'body is requird'],
    },
    author:{
      type:String,
      required:true
    },
    tags:{
      type:[String]
    },
    img: String
    ,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },  
      createdAt: {
        type: Date,
        default: Date.now(),
      },
});

const Blog = mongoose.model('Blog',blogSchema);
module.exports=Blog;