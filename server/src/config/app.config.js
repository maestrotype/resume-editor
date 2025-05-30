const config = {
    server: {
        port: process.env.PORT || 4000,
        env: process.env.NODE_ENV || 'development'
    },
    api: {
        prefix: '/api',
        version: 'v1'
    },
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        credentials: true
    },
    uploads: {
        basePath: 'uploads',
        avatars: 'uploads/avatars',
        resumes: 'uploads/resumes'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    }
};

module.exports = config; 