const jwt = require('jsonwebtoken');

 module.exports = function (req, res, next){
    //check for token
    const token = req.header('x-auth-token');

    //check if not token
    if(!token) return res.status(401).json([{msg: 'No token, authorization denied', type: 'error'}]);

    //Verify token
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
        next();
    }
    catch(err){
        res.status(401).json([{msg: 'Token is invalid', type: 'error'}]);
    }
 }