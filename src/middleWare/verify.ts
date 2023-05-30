import { RequestHandler, json } from 'express'
import Jwt from 'jsonwebtoken';

const verifyToken : RequestHandler = async(req, res, next)=>{
    const token = req.headers.authorization?.split("")[1]

    try {
        const decodedClaims = Jwt.verify(token!,process.env.SECRET_KEY!)
        console.log("decode: ",decodedClaims)
        
        return next();
        
    } catch (error) {
        return res.status(500).json(error)
        
    }
}
export default verifyToken;
