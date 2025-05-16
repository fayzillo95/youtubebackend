export default class ValidationError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
        this.name = this.constructor.name
    }
    static async (err,res){

    }
}