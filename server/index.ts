import express,{Request, Response, Express, NextFunction }from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
const app:Express=express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: process.env.URL
}));
const port = process.env.PORT;


app.post('/api/login', (req: Request, res: Response) => {
  const user={
    username:'admin',
    password:'12345',
    role:'admin'
  }
  if(req.body.username===user.username && req.body.password=== user.password && req.body.role===user.role){
    console.log(user)
    const token = jwt.sign(user, `${process.env.JWT_SECRET_KEY}`);
    res.cookie("jwt",token,{maxAge:24 * 60 * 60 * 1000})
    res.json({username:user.username,role:user.role})
  }
  else{
    res.json({message:'unable logged in'})
  }
})
app.get('/api/search', async(req: Request, res: Response, next:NextFunction) => {
  const value=req.query.search
  const token = req.cookies['jwt']
  if (token) {
    try {
      const verified = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
          if(verified){
              const response=await fetch(`https://api.tvmaze.com/search/shows?q=${value}`)
              res.json(await response.json())
          }else{
              
            res.json({error:{
              message:'token is not valid'
            }})
             
          }
      } catch (error) {
          // Access Denied
          return res.status(401).send(error);
      }
  }
  else {
    res.json({error:{message:'token required'}})
  }
  
//   
})
app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});