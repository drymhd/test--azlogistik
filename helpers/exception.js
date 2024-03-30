


class Exception{
    constructor(message, statusCode) {
        this.message = message,
        this.statusCode = statusCode 
    }

    getException() {
        return {
            message: this.message,
            statusCode: this.statusCode
        }
    }

    getStatusCode() {
        return this.statusCode;
    }

    getMessage() {
        return this.message;
    }
}


module.exports = Exception;