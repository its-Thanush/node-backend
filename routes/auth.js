const express = require('express');
const router = express.Router();
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const requireAuth = require('../middleware/auth');


router.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;
    if(!name||!email||!password)
        return res.status(400).json({error:'All fields required'});
    const hashed = await bcrypt.hash(password,10);

    try{
        const user = await prisma.user.create({
            data:{name,email,password:hashed}
        });

        const {password:_,...safeUser} =user;
        res.status(201).json(safeUser);
    }catch (e) {
  console.log("ERROR 👉", e);

  if (e.code === 'P2002') {
    return res.status(400).json({ error: 'Email already registered' });
  }

  res.status(500).json({ error: 'Internal server error' });
}
});



//POST /auth/login

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    if(!email||!password)
        return res.status(400).json({error:'Email and Password required'});

    const user = await prisma.user.findUnique({where:{email}});
    if(!user)
        return res.status(401).json({error:"Invalid Credentials"});

    const valid = await bcrypt.compare(password,user.password);
    if(!valid)
        return res.status(401).json({error:'Invalid credentials'});

    const token = jwt.sign(
        {userId:user.id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    );

    res.json({token})
});

router.get('/me',requireAuth,async(req,res)=>{
    const user = await prisma.user.findUnique({
        where:{id:req.user.userId},
        select:{id:true,name:true,email:true,createdAt:true}
    });
    res.json(user);
});

module.exports = router;