import Joi from "joi";

export const register_Validation = Joi.object({
    username : Joi.string().min(3).max(30).alphanum().required(),
    password : Joi.string().min(8).max(16).required()
});
export const login_Validation = Joi.object({
    username : Joi.string().min(3).max(30).alphanum().required(),
    password : Joi.string().min(8).max(16).required()
});
export const fileValidate = Joi.object({
    title:Joi.string().min(1).required(),
    user_id:Joi.string().required(),
    size:Joi.number().required()
})