import JWT from "jsonwebtoken";
import token_Generetor_ from "../utils/token/token_Generetor_.js";

export const jwtMidllwares  = (req, res, next) => {
    try {
        let data = token_Generetor_(req.user)
        res.status(201).json({...data})
    } catch (error) {  
        next(error)
    }
}

export const checkToken = (req, res, next) => {
    try {
        let token = req.headers.token
        let user = JWT.verify(token,"secret")
        req.user = {id:user.id,username:user.username}
        next() 
    } catch (error) {
        error.status = 400
        next(error)        
    }
}