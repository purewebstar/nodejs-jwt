/** importing dependencies */
import bcrypt from 'bcrypt'

/** importing models */
import {userAccount} from '../models/user.model.js'
import jwt from 'jsonwebtoken'

/** Creating user account */
export const createUser = async (req, res) =>{
   // accepting request data's
   const fullName = req.body.fullName
   const email = req.body.email
   const password = req.body.password
   
   // checking if the user exists
   let isExist = await userAccount.findOne({email})
   if(isExist){
       return res.json({message: 'user email exists! please try another!'})
   }
   const encryptPass = await bcrypt.hash(password, 10)
   const registerUser = new userAccount({
       fullName,
       email,
       password: encryptPass
   })

   // try to register new user
   try{

     await registerUser.save()
     res.status(201).json({message: 'user account created successfully!'})

   }catch(err){
       res.json({message: err.message})
   }

}

/** reading user account */
export const readUser = async (req, res) =>{
     
     const {email, password} = req.body
     const user = { email: email }

     let isExist = await userAccount.findOne({email})
     if(!isExist) return res.status(404).json({message: 'User Not Found!'})
     //
     let isMatch = await bcrypt.compare(password, isExist.password)
     if(isMatch){
        /// generate access token
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: '5m'})
        // generate refresh token
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn: '3h'})

        // setting access token on header
        res.header('Authorization', 'Bearer ' + accessToken)
        // setting refresh token on cookie
        res.cookie('jwtToken',  refreshToken, {maxAge: 3*60*60*1000, httpOnly: true})
        //----------
        // return res.json({accessToken: accessToken, refreshToken: req.cookies.jwtToken})
        //----------
        return res.status(200).json({message: 'successfully logged In'})
     }
     else return res.status(404).json({message: 'Password Error!'})
}

/** read user info */
export const readUserInfo = async(req, res) =>{
         const email = req.user.email
    try{
        const user = await userAccount.findOne({email})
        res.json(user)
 
     }catch(err){
       res.json({message: err.message})
     }
}