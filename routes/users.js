const express = require ('express');
const router = express.Router();
const Users = require('../controllers/users');
const bcrypt = require ('bcryptjs');
const jwt = require ('jwt-simple');
const moment = require ('moment');
const middleware = require('./middleware')

router.get('/', middleware.checkToken, async (req, res) => {
    const users = await Users.getAll();
    res.json(users);
})

router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        user.password = bcrypt.hashSync(user.password, 10);
        const result = await Users.registerUser(user);
        res.json(result);
    }
    catch (error) {
        res.json(error);
    }
})

router.post('/login', async(req, res) => {
    const user = await Users.getByEmail(req.body.email)
    console.log("Datos de user en el back" + JSON.stringify(user))
    if (user===undefined){
        res.json({
            error: 'Error, ingrese email y/o password'
        })
    }
    else {
        const equals = bcrypt.compareSync(req.body.password, user.password);
        if (!equals){
            res.json({
                error: 'Combinación usuario/password incorrecta'
            })
        }
        else {
            res.json({
                message: 'SUCCESS',
                succesfull: createToken(user),
                done: 'Usuario autenticado',
                user_id: user.user_id
            })

        }
    
    }
})

router.put('/', async(req, res)=> {
    const {user_id, email, username, phone, active} = req.body;
    const query = await Users.updateUser(user_id, email, username, phone, active);
    return res.status(201).json(query);
})

router.use(middleware.checkToken)

router.get('/mainUser', (req,res) => {
    Users.getById(req.userId)
        .then(rows => {
            console.log("Rows " + rows);
            res.json(rows);
        })
        .catch(err=>console.log(err));
})

const createToken = (user) => {
    let payload = {
        userId: user.user_id,
        createdAt: moment().unix(),
        expiresAt: moment().add(4, 'day').unix()
    }
    return jwt.encode(payload, "Token-Auth")
}



module.exports = router;