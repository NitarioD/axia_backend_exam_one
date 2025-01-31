const jwt = require("jsonwebtoken");


exports.authenticate = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).send("token not valid");
            }
            
            req.user = user;
            return ;
        });
        next();
    } catch (error) {
        return res.status(401).send("Unauthorized");
    }
}