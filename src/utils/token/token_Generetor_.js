import JWT from "jsonwebtoken";

export default (payload) => {
    const accessToken = JWT.sign(payload,"secret",{expiresIn:'1h'})
    const refreshToken = JWT.sign(payload,"secret",{expiresIn:'24h'})
    return {
        sucess : true,
        accessToken,
        refreshToken
    }
}