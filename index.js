const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/hello', (req,res)=>{
    res.json({
        name:"thanush",
        message:"Hello from your server",
        timestamp: new Date().toISOString()
    });
});
//url http://localhost:3000/hello
//output {"name":"thanush","message":"Hello from your server","timestamp":"2026-03-26T17:37:47.460Z"}

app.get('/greet/:name',(req,res) =>{
    const {name} =req.params;
    res.json({
        message:`Hello ${name}! welcome`
    });
});
//url http://localhost:3000/greet/vimal
//output {"message":"Hello vimal! welcome"}

app.post('/echo',(req,res)=>{
    const body = req.body;
    res.json({
        received:body
    });
});


//URl ---> http://localhost:3000/echo
//outreq {"name": "thanush", "age": 21 }
//out res {"received": {"name": "thanush","age": 21}}

app.get('/add/:a/:b',(req,res)=>{
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    res.json({
        result:a+b
    });
});

app.listen(PORT,()=>{
console.log(`Server is currently running on http://localhost:${PORT}`);});


