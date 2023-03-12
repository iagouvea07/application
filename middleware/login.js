const jwt = require('jsonwebtoken')
const db = require('../db/db.js')


module.exports = (req, res, next) => {

    try{
            const auth = req.cookies.token
            const decode = jwt.decode(auth, 'AA5gx&kCBz7J0nNRFY')
            if(decode) {
                const SQL_COOKIE = 'SELECT * FROM sessions WHERE token = ?;'
    
                db.query(SQL_COOKIE, [auth], (err, result) =>{
                    if(result[0] == undefined){
                        res.redirect('/home/401')
                    }
                    else{
                        next()
                    }
                })
            }
    }

    catch(error){
        res.clearCookie('token')
        res.redirect('/home/401')
    }
}   
