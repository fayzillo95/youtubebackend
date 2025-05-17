import JWT from "jsonwebtoken";
import token_Generetor_ from "../utils/token/token_Generetor_.js";
import User_Model_ from "../Models/User_Model_.js";
import ForeibinError from "../utils/erros/ForebiddenError_.js";

export const jwtMidllwares  = (req, res, next) => {
    try {
        // req.user.tokenVersion +=1
        let data = token_Generetor_(req.user)
        res.status(201).json({...data})
    } catch (error) {  
        next(error)
    }
}

export const checkToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1]
        let user = JWT.verify(token,"secret")
        let existsUser = await User_Model_.findOne({_id:user.id})
        if(existsUser.username !== user.username) throw new ForeibinError(406,"Re assignet username login again !")
        req.user = {id:user.id,username:user.username}
        next() 
    } catch (error) {
        error.status = error.status || 406
        next(error)        
    }
}