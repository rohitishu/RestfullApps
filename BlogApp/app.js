var express=require("express");
var app=express();
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser: true, useUnifiedTopology: true});
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
var blogSchema=new mongoose.Schema({
title:String,
image:String,
body:String,
created:{type:Date, default:Date.now}
});
var Blog=mongoose.model("Blog",blogSchema);
/*Blog.create({
   title:"Test Blog",
   image:"https://pixabay.com/get/52e3d5404957a514f1dc84609620367d1c3ed9e04e5074417c287cd4944fc1_340.jpg",
   body:"hello this is a blog spot" 
});*/
app.get("/",function(req,res){
res.redirect("/blogs");
});
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
       if(err)
       {
           console.log("ERROR!");

       } 
       else
       {
        res.render("index",{blogs:blogs});  
       }
    });

});
app.listen(9001,function(){
    console.log("the server has started!!"); 
 });
