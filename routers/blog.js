const express = require('express');
const blogController = require('../controller/blog');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User  = require('../model/user');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage });

 
//get all blog 
router.get('/getAll',async(req , res ,next)=>{
    try{
        const result = await   blogController.getAll();
      res.json(result);
      }
       catch(e){
       next(e);
       } 

 });

// add add new blogItem
router.post('/add',authMiddleware,upload.single("demo_image"),async (req,res,next)=> {
     newBlog=req.body;
     id= req.user.id;

     // check or not  img is uploaded correctly
     try{
         myimg=req.file.filename;
         myObj={...newBlog,img:myimg,userId :id}    // obj contain img to be upload
     }catch(e){
         myObj={...newBlog,userId :id}              // obj not contain img to uploaded
     }

     // upload obj to server
  
    try{
       result =await blogController.createBlog(myObj).then(post=>{
              res.send({data:post});
               User.findByIdAndUpdate(id,{ $push: { Blogs: post._id } }) });
    }
     catch(e){
     next(e);
     } 
});



// edit blog
router.patch('/edit/:id',authMiddleware,async(req , res ,next)=>{
    const {body}=req , {id} =req.params; 
     try{
      const editedBlog = await blogController.editBlog(id,body);
      res.json({data:editedBlog});
      }
      catch(e){
        next(e);
      }
  });

// delete Blog
router.delete('/delete/:id',authMiddleware, async (req , res ,next)=>{
    const {id} =req.params; 
    try{
      const deletedBlog = await blogController.deleteBlog(id);
      res.json({data:deletedBlog});
      }
      catch(e){
        next(e);
      }
  });


//search by name , author and tags
router.get('/search',authMiddleware,async(req , res ,next)=>{
   const dataToSearch = req.query;
    try{
        const result = await   blogController.search(dataToSearch);
        res.json({data:result});  
      }
       catch(e){
       next(e);
       } 
 });




module.exports=router;
