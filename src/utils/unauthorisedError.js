const AppError = require("./appError");

class UnauthorisedError extends AppError {
    constructor() {
        super(`User is not authroised properly`, 401);
    }
}

module.exports = UnauthorisedError;