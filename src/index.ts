
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





// console.log("DATABASE_URL FROM RUNTIME:");
// console.log(process.env.DATABASE_URL);

// const app = require('./app');

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


//=====================================================================================================
// require('dotenv').config();

// const express = require('express');
// const app  = require('./app');
// const userRoutes = require('./users');
// const errorHandler = require('./middleware/errorHandler');
// const PORT = 4000;

// app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));

// app.use((req, res, next) => {
//   console.log(`👉 ${req.method} ${req.url}`);
//   next();
// });

// app.use(express.json());

// app.get('/hello', (req,res)=>{
//     res.json({
//         name:"thanush",
//         message:"Hello from your server",
//         timestamp: new Date().toISOString()
//     });
// });

// //url http://localhost:3000/hello
// //output {"name":"thanush","message":"Hello from your server","timestamp":"2026-03-26T17:37:47.460Z"}





// app.get('/greet/:name',(req,res) =>{
//     const {name} =req.params;
//     res.json({
//         message:`Hello ${name}! welcome`
//     });
// });
// //url http://localhost:3000/greet/vimal
// //output {"message":"Hello vimal! welcome"}




// app.post('/echo',(req,res)=>{
//     const body = req.body;
//     res.json({
//         received:body
//     });
// });

// //URl ---> http://localhost:3000/echo
// //outreq {"name": "thanush", "age": 21 }
// //out res {"received": {"name": "thanush","age": 21}}




// app.get('/add/:a/:b',(req,res)=>{
//     const a = Number(req.params.a);
//     const b = Number(req.params.b);
//     res.json({
//         result:a+b
//     });
// });
// //URl -- > http://localhost:3000/add/2/5
// //output {"result":7}





// // let users = [
// //    {id:1, name: 'cheesy' ,email:'cheesy@gmail.com'},
// //     {id:2, name : 'jaeger', email:'jaeger@gamil.com'}
// // ];

// // let nextId = 3;

// // router.get('/',(req,res)=>{
// //     res.json(users);
// // });

// // //url http://localhost:3000/users
// // //Full users Fetch [{"id":1,"name":"cheesy","email":"cheesy@gmail.com"},{"id":2,"name":"jaeger","email":"jaeger@gamil.com"}]



// // // === which basically check is value is same and its type too

// // router.get('/:id',(req,res)=>{
// //     const user = users.find(u => u.id === Number(req.params.id));
// //     if(!user)return res.status(404).json({error:"Antha mari entha user um illa"});
// //     res.json(user);
// // });
// // //url http://localhost:3000/users/2
// // // {"id":2,"name":"jaeger","email":"jaeger@gamil.com"}  else {"error":"Antha mari entha user um illa"}


// // router.post('/',(req,res)=> {
// //     const {name,email} =req.body;
// //     if(!name||!email){
// //         return res.status(400).json({error:"Name and email is required"});
// //     }
 
// //     const newUser = {id:nextId++,name,email};
// //     users.push(newUser);
// //     res.status(201).json(newUser);
// //     });
// //     //url http://localhost:3000/users
// //     // req {
// //     // "name": "thanush",
// //     // "email": "thanush@gmail.com"}


// // router.patch('/:id',(req,res)=>{
// //     const user = users.find(u=> u.id === Number(req.params.id));
// //     if(!user) return res.status(404).json({error:"antha mari entha user um illa"});
// //     Object.assign(user,req.body);
// //     res.json(user);
// // });

// // // url http://localhost:3000/users/1
// // // req {"name": "thanush black"}
// // //res  {"id":1,"name":"thanush black","email":"cheesy@gmail.com"}


// // router.delete('/:id',(req,res)=>{
// //     const idx= users.findIndex(u => u.id === Number(req.params.id));
// //     if(idx === -1) return res.status(404).json({error:"antha mari entha user um illa"});

// //        const deletedUser = users.splice(idx, 1);
// //     res.json({ message: "User deleted", user: deletedUser[0] });
// // });

// // //url http://localhost:3000/users/1
// // //res {"message":"User deleted","user":{"id":1,"name":"thanush black","email":"cheesy@gmail.com"}}



// // module.exports = router;
// // app.use('/users', userRoutes); 
// // app.use('/auth',  require('./routes/auth'));
// // app.use(errorHandler);


// app.listen(PORT,()=>{
// console.log(`Server is currently running on http://localhost:${PORT}`);});


