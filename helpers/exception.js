const exception = (message) => {
    return Exception(message);
}


class Exception {
    constructor(message) {
        this.message = message
    }
}


module.exports = exception;