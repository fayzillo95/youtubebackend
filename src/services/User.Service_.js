import User_Model_ from "../Models/User_Model_.js";
import bcrypt from "bcrypt"
import fs from "fs";
import path from "path";
import Files_Model_ from "../Models/Files_Model_.js";
import { error } from "console";
import CustomError from "../utils/erros/Custum.Error_.js";
import { isValidObjectId } from "mongoose";
import ValidationError from "../utils/erros/ValidationError_.js";

function testPath(endPath) {
    let filePath = path.join(process.cwd(), "src", "utils", "uploads", endPath)
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true })
    }
    return filePath
}

async function isvalidBody(body, _id) {
    if (!isValidObjectId(_id)) throw new ValidationError(400, "Invalid user_id!")
    let sxema = ['username', 'password']
    for (let key of Object.keys(body)) {
        if (!sxema.includes(key)) {
            throw new CustomError(`Invalid key ${key} !`, 400)
        }
        if (!body[key] || typeof body[key] !== "string") {
            throw new CustomError(`Invalid key ${key} !`, 400)
        }
    }
    if (body.password) {
        body.password = await bcrypt.hash(body.password, 10)
    }
    return body
}
export default class UserService {
    constructor() { }

    async createItem(req) {
        let file = req.files.profile_img
        let filename = new Date().getTime() + "__" + file.name
        let filePath = testPath("photos")
        file.mv(path.join(filePath, filename))
        const password = await bcrypt.hash(req.body.password, 10)
        req.body.profile_img = filename
        const newUser = await User_Model_.create({ ...req.body, password,tokenVersion:1 })
        console.log({ id: newUser._id, username: newUser.username })
        return { id: newUser._id, username: newUser.username }
    }

    async getFiles(id) {
        const data = await Files_Model_.find({ user_id: id })
        const user = await User_Model_.findOne({ _id: id })
        let result = { username: user.username, files: data }
        return result
    }
    async getAllUserAndFiles() {
        const data = await Files_Model_.find()
            .populate("user_id", "username profile_img")
            .lean()
        return data.map((item => {
            item.user = item.user_id
            delete item.user_id
            delete item.__v
            return item
        }))
    }
    async addMovie(body) {
        let { file, user_id } = body
        let fileName = new Date().getTime() + "_" + file.name
        let fullPath = testPath("movies")
        file.mv(path.join(fullPath, fileName), (error) => {
            if (error) {
                throw new CustomError(error.message, 500)
            }
        });

        const data = await Files_Model_.create({
            title: body.title,
            size: Number(file.size / (1024 * 1024)),
            user_id,
            file_name: fileName
        })
        return data
    }
    updateTitle(title, _id) {
        if (!isValidObjectId(_id)) throw new CustomError("Invaid id !", 400)
        return Files_Model_.findOneAndUpdate({ _id }, { title }, { new: true })
    }
    async updateItem(body, _id, next) {
        try {
            body = await isvalidBody(body, _id)
            const existsUser = await User_Model_.findOne({ _id })
            if (!existsUser) throw new CustomError("User not found !", 404)
            return User_Model_.findOneAndUpdate({ _id }, body, { new: true })
        } catch (error) {
            next(error)
        }
    }
    getAllusers() {
        return User_Model_.find()
    }
    async deleteFile (user_id, _id) {
        const fileexits = await Files_Model_.deleteOne({});
        if(fileexits.deletedCount){
            console.log(fileexits)
            return {message:"File deleted!"}
        }
        throw new CustomError("File not found",404)
    }
}
