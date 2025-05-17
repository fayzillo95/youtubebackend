import { Router } from "express";
import { jwtMidllwares,  checkToken } from "../midllwares/jwtHandlers.js";
import UserController from "../controllers/User.Controller_.js";
import { fileValidateMidllwares, login_validate, register_validate } from "../midllwares/validationMidllwares_.js";
import { responseHandlers } from "../midllwares/responseHandlers_.js";
import path from "path";
import fs from "fs"

const userController = new UserController()
const userRouter = Router()

userRouter.post("/api/users/register", register_validate, userController.register.bind(userController), jwtMidllwares)
          .get("/api/users/all",userController.readAllUser.bind(userController),responseHandlers)  
          .post("/api/users/login",login_validate, jwtMidllwares)
          .get("/api/user/movies",checkToken, userController.getUserMovies.bind(userController),responseHandlers)
          .get("/api/users/files",userController.getAllUserMovies.bind(userController),responseHandlers)  
          .post("/api/user/movie",checkToken, fileValidateMidllwares, userController.appenMovie.bind(userController), responseHandlers)  
          .put("/api/user/movie/title/:id",checkToken,userController.updateTitle.bind(userController),responseHandlers) 
          .delete("/api/user/movie/:id",checkToken,userController.deleteMovie.bind(userController),responseHandlers)
          .put("/api/myaccaunt/update",checkToken,userController.updateUser.bind(userController),responseHandlers)
          .delete("/api/myaccaunt/logout",checkToken,userController.delteUser.bind(userController),responseHandlers)
          .get("/clear/logs", (req, res) => {
                try {
                    const fpath = path.join(process.cwd(),"src","utils","Log","logger.txt")
                    fs.writeFileSync(fpath,"=== Looger File ===","utf-8")
                    const file = fs.readFileSync(fpath,"utf-8")
                    res.sendFile(file)
                } catch (error) {
                    res.send(error.message)                   
                }
            })
export default userRouter