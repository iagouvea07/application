const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user: 'root.cloudserver@gmail.com',
        pass: 'mwcztrqoqjhcixee'
    }
})

const sendMail = async (mailDetails, callback) =>{
    try{
        const info = await transporter.sendMail(mailDetails)
        callback(info)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = sendMail