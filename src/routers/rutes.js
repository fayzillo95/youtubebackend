import { Router } from "express";
import { jwtMidllwares,  checkToken } from "../midllwares/jwtHandlers.js";
import UserController from "../controllers/User.Controller_.js";
import { fileValidateMidllwares, login_validate, register_validate } from "../midllwares/validationMidllwares_.js";
import { responeHandlers } from "../midllwares/responseHandlers_.js";

const userController = new UserController()
const userRouter = Router()

userRouter.post("/api/users/register", register_validate, userController.register.bind(userController), jwtMidllwares)
          .post("/api/users/login",login_validate, jwtMidllwares)
          .get("/api/user/movies",checkToken, userController.getUserMovies.bind(userController),responeHandlers)
          .get("/api/users/files",userController.getAllUserMovies.bind(userController),responeHandlers)  
          .post("/api/user/movie",checkToken, fileValidateMidllwares, userController.appenMovie.bind(userController), responeHandlers)  

export default userRouter