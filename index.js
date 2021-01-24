const express = require('express');
const app =express();
const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Database Connected Successfully')).catch((err) =>console.log(err));

const blogRouter = require('./routers/blog');
const userRouter = require('./routers/user');

app.use(express.json());

app.use('/user',userRouter)
app.use('/blog',blogRouter)



app.use((err, req, res, next) => {
    res.status(503).json({"error":err.message});
  });

app.use((req, res, next) => {
    res.status(404).json({ err: 'page not found' });
 });
const{PORT=9000}=process.env;
app.listen(PORT,()=>{
    console.log('App is ready on: ' , PORT);
})