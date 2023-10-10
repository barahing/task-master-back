const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
    if (!req.headers['user-token']){
        return res.json(
            {
                error: 'Deberías incluir el header'
            }
        )
    }
    const token = req.headers['user-token'];
    console.log("Token: "+ token);
    let payload = null;
    try {
        payload = jwt.decode(token, "Token-Auth");
        
    } catch (err) {
        return res.json ({
            error: 'Token inválido'
        });
    }
    if (moment().unix() > payload.expiresAt){
        return res.json(
            {
                error: 'El token expiró'
            })  
        }
    req.userId = payload.userId;
    console.log("User ID" + req.userId)
    next();
    
}

module.exports = {
    checkToken: checkToken
}