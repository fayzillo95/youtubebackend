import { register_Validation, login_Validation, fileValidate } from "../utils/validations/authValiudation.js"
import User_Model_ from "../Models/User_Model_.js"
import ValidationError from "../utils/erros/ValidationError_.js"
import ForibiddenError from "../utils/erros/ForebiddenError_.js"
import bcrypt from "bcrypt"

export const register_validate = async (req, res, next) => {
    try {
        let { error } = register_Validation.validate(req.body)
        if (error) throw new ValidationError(400, error.details[0].message)

        let user = await User_Model_.findOne({ username: req.body.username })
        if (user) throw new ForibiddenError(403, "User already exists !")

        next()
    } catch (error) {
        next(error)
    }
}

export const login_validate = async (req, res, next) => {

    try {
        let { error } = login_Validation.validate(req.body)
        if (error) throw new ValidationError(400, error.details[0].message)

        let user = await User_Model_.findOne({ username: req.body.username }, { _id: 1, username: 1, password: 1 })
        if (!user) throw new ForibiddenError(404, "Invalid email or password !")

        let acsessPassword = await bcrypt.compare(req.body.password, user.password)
        if (!acsessPassword) throw new ForibiddenError(403, "Invalid email or password !")

        delete user.password
        req.user = { id: user._id, username: user.username }
        next()

    } catch (error) {
        next(error)
    }
}

export const fileValidateMidllwares = (req, res, next) => {
    try {
        console.log(req.user)
        let { error } = fileValidate.validate({ title: req.body.title, user_id: req.user.id, size: req.files.movie.size })
        if (error) {
            throw new ValidationError(400, error.details[0].message)
        }
        next()
    } catch (error) {
        next(error)
    }
}

