const express = require('express')
const router = express.Router()
const login = require('../middleware/login.js')
const db = require('../db/db.js')

router.get('/', (req, res) =>{
    res.redirect('home/login')
})

router.get('/login', (req, res) =>{
    const auth = req.cookies.token
    const SQL_COOKIE = 'SELECT * FROM sessions WHERE token = ?;'
    db.query(SQL_COOKIE, [auth], (err, result) =>{
        if(result[0] == undefined){
            res.render('home/login')
        }
        else{
            res.redirect('/home/dashboard')
        }
    })
})

router.get('/register', (req, res) =>{
    res.render('home/register')
})

router.get('/active', (req, res) =>{
    res.render('home/active')
})

router.get('/dashboard', login, (req, res) =>{
    const SQL_WEIGHT_STOCKS = 'SELECT ticker, SUM(value) AS value FROM stocks_dividends WHERE YEAR(date) = YEAR(current_date()) GROUP BY ticker ORDER BY ticker;'
    const SQL_DIVIDENDS = 'SELECT SUM(value) AS value, MONTH(date) AS date FROM stocks_dividends WHERE YEAR(date) = YEAR(CURRENT_DATE()) GROUP BY MONTH(date) ORDER BY MONTH(date);'
    const SQL_DEBTS = 'SELECT SUM(value) AS value, MONTH(date) AS date FROM debts WHERE YEAR(date) = YEAR(CURRENT_DATE()) GROUP BY MONTH(date) ORDER BY MONTH(date);'
    const SQL_WEIGHT_ENTERPRISE = 'SELECT name, SUM(value) AS value FROM debts WHERE YEAR(date) = YEAR(current_date()) GROUP BY name ORDER BY name;'
    const SQL_STOCKS_NAME = 'SELECT ticker FROM stocks_dividends WHERE YEAR(date) = YEAR(current_date()) GROUP BY ticker ORDER BY ticker;'

    db.query(SQL_WEIGHT_STOCKS, (err, result) =>{
        try{
            if (req.accepts('html')) {
                res.render('home/dashboard');
            } 
            else if (req.accepts('json')) {
                db.query(SQL_DIVIDENDS, (err, dividends) =>{
                    db.query(SQL_DEBTS, (err, debts) =>{
                        db.query(SQL_WEIGHT_ENTERPRISE, (err, weight) =>{
                            db.query(SQL_STOCKS_NAME, (err, stocks) =>{
                                res.json({resultado: result, valor: dividends, pagamentos: debts, peso: weight, nomes: stocks});
                            })  
                        })
                    })
                })
            } 
            else {
                res.sendStatus(406);
            }   
        }
        catch(err){
            res.sendStatus(500)
        } 
    })
})

router.get('/logout', (req, res) =>{
    const SQL = 'DELETE FROM sessions WHERE token = ?'
    db.query(SQL,[req.cookies.token], (err, result) => {
        if(err) throw err
        res.clearCookie('token')
        setTimeout(() => {
            res.redirect('/home/login')}, 1000)
    })
})

router.get('/stocks', login, (req, res) =>{
    const SQL = 'SELECT name, ticker FROM stocks;'
    db.query(SQL, (err, result) =>{
        res.render('home/stocks', { names: result, tickers: result })
    })  
})

router.get('/dividends', login, (req, res) =>{
    const SQL = 'SELECT ticker FROM stocks;'
    db.query(SQL, (err, result) =>{
        res.render('home/dividends', { tickers: result })
    })
})

router.get('/dividends_history', login, (req, res) =>{
    const SQL = 'SELECT ticker FROM stocks;'
    db.query(SQL, (err, result) =>{
        res.render('home/dividends_history', { tickers: result })
    })
})

router.get('/payments', login, (req, res) =>{    
    const SQL = 'SELECT name, cnpj FROM payment_type;'
    db.query(SQL, (err, result) =>{
        res.render('home/payments', { payments: result })
    })   
})

router.get('/debts', login, (req, res) =>{
    const SQL = 'SELECT name FROM payment_type;'
    db.query(SQL, (err, result) =>{
        res.render('home/debts', { payments: result })
    })
})

router.get('/debts_history', login, (req, res) =>{
    const SQL = 'SELECT name FROM payment_type;'
    db.query(SQL, (err, result) =>{
        res.render('home/debts_history', { payments: result })
    })
})

module.exports = router