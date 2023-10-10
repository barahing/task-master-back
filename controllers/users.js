const db = require ('../db')

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_user', (err, rows) => {
            if (err) reject (err)
            resolve (rows);
        });
    });
};

const updateUser = (user_id, email, username, phone, active) => {
    return new Promise ((resolve, reject) => {
        db.query('UPDATE tb_user SET username=?, email=?, phone=?, active=? WHERE user_id=?', [username, email, phone, active, user_id], (err, result) => {
            if (err) reject (err)
            if (result){
                 resolve (result)
            }
        } )
    })
}

const registerUser = ({username, email, password, phone, active, rol}) => {
    return new Promise ((resolve, reject) => {
        db.query('INSERT INTO tb_user (username, email, password, phone, active, rol) VALUES (?,?,?,?,?,?)', [username, email, password, phone, active, rol], (err, result) => {
            if (err) reject (err)
            if (result) resolve (result)
        } )
    })
}

const getByEmail = (pEmail ) => {
    return new Promise ((resolve, reject) => {
        db.query('SELECT * FROM tb_user WHERE email=?', [pEmail], (err,rows) =>{
            if (err) reject (err);
            resolve(rows[0]);
        })
    })
}

const getById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_user WHERE user_id=?', [pId], (err, rows) => {
            if (err) reject(err)
            resolve(rows[0]);
        })
    })
}

module.exports = { 
    getAll: getAll,
    registerUser : registerUser,
    getByEmail: getByEmail,
    getById: getById,
    updateUser: updateUser
}