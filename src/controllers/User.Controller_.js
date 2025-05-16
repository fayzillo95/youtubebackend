import { title } from "process"
import UserService from "../services/User.Service_.js"

export default class UserController{
    constructor(){
        this.service = new UserService()
    }
    async register(req, res, next) {
        try {
            req.user = await this.service.createItem(req)
            next()
        } catch (error) {
            next(error)
        }

    }
    async getUserMovies(req, res, next) {
        try {
            req.user = await this.service.getFiles(req.user.id)
            req.status = 200
            next()
        } catch (error) {
            next(error)   
        }
    }
    async getAllUserMovies (req, res, next) {
        try{
            req.user = await this.service.getAllUserAndFiles()
            req.status = 200
            next()
        }catch(error) {
            next(error)
        }
    }
    async appenMovie (req, res, next) {
        try {
            req.user = await this.service.addMovie({file:req.files.movie, user_id:req.user.id, title : req.body.title})
            req.status = 201
            next()    
        } catch (error) {
            next(error)
        }
    }
}
