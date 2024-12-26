//Basic Approach 
const express=require('express'); 

const app=express();

function oldEnough(age){
    if(age>=14){
        return true; 
    }
    else{
        return false; 
    }
}

app.get("/ride1",function(req,res){
    if(oldEnough(req.query.age)){
        res.json({
            msg:"Enjoy your ride 1"
        })
    }
    else{
        res.json({
            msg:"You are not old enough"
        })
    }
   
})

app.get("/ride2",function(req,res){
    if(oldEnough(req.query.age)){
        res.json({
            msg:"Enjoy you ride 2"
        })
    }
    else{
        res.json({
            msg:"You are not old enough"
        })
    }
   
})

app.listen(3000); 

