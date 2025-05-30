class AppError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AppError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 404);
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

class FileUploadError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

module.exports = {
    AppError,
    NotFoundError,
    ValidationError,
    FileUploadError
}; 