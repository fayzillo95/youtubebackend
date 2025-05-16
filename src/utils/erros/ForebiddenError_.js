export default class ForeibinError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
    }
}