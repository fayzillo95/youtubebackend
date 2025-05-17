import { title } from "process"
import UserService from "../services/User.Service_.js"
import CustomError from "../utils/erros/Custum.Error_.js"

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
    async updateTitle(req, res, next) {
        try {
            const data = await this.service.updateTitle(req.body.title,req.params.id)
            req.user = data || []
            req.status = 202
            next()
        } catch (error) {
            next(error)
        }
    }
    async updateUser (req, res, next) {
        try {
            const user = await this.service.updateItem(req.body,req.user.id,next)
            req.user = { id: user._id, username: user.username }
            next()
        } catch (error) {
           next(error) 
        }
    }
    async readAllUser (req, res, next) {
        try {
            let users = await this.service.getAllusers()
            req.user = users || []
            next()
        } catch (error) {
            next(error)   
        }
    }
    async deleteMovie(req, res, next) {
        try {
            req.user = await this.service.deleteFile(req.user.id, req.params.id)
            next()
        } catch (error) {
            next(error)
        }
    }
    async delteUser(req, res, next) {
        try {
            req.user = await this.service.delteUser(req.user.id)
            next()
        } catch (error) {
            next(error)
        }
    }
}
