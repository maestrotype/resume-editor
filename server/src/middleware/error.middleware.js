const { AppError } = require('../utils/errors');

const errorLogger = (err, req, res, next) => {
    console.error('\x1b[31m%s\x1b[0m', '[Error]:', err);
    next(err);
};

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.status).json({
            success: false,
            message: err.message
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    // MongoDB duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate field value entered'
        });
    }

    // Default error
    return res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
};

const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Not found - ${req.originalUrl}`
    });
};

module.exports = {
    errorLogger,
    errorHandler,
    notFound
}; 