const jwtService = require("jsonwebtoken");

const publicRoutes = [
    '/auth/login',
    '/auth/register'
]

const authenticateRequest = (req, res, next) => {
    if (publicRoutes.includes(req.path)) {
        return next();
    }

    const authorization = req.headers["authorization"];
    const [_, token] = authorization.split(' ')
    const JWT_SCRET = process.env.JWT_SECRET;

    jwtService.verify(token, JWT_SCRET, (err, userInfo) => {
        if (err) {
            res.status(403).end();
            return;
        }
        req.userInfo = userInfo;
        next();
    });
};

module.exports = authenticateRequest;