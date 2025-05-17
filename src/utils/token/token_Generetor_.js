import JWT from "jsonwebtoken";

export default (payload) => {
    const accessToken = JWT.sign(payload,"secret",{expiresIn:'24h'})
    const refreshToken = JWT.sign(payload,"secret",{expiresIn:'48h'})
    return {
        sucess : true,
        accessToken,
        refreshToken
    }
}