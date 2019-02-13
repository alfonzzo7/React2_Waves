const mailer = require('nodemailer');
const { welcome } = require('./welcome_template');
const { purchase } = require('./purchase_template');
require('dotenv').config();

const getEmailData = (to, name, token, type, actionData) => {
    let data = null;

    switch (type) {
        case 'welcome':
            data = {
                from: 'Waves <waves.store.es@gmail.com>',
                to,
                subject: `Welcome to waves ${name}`,
                html: welcome()
            }
        break;

        case 'purchase':
            data = {
                from: 'Waves <waves.store.es@gmail.com>',
                to,
                subject: `Shipping order ${actionData.data.porder}`,
                html: purchase(actionData)
            }
        break;
    
        default:
            data;
    }

    return data;
}

const sendEmail = (to, name, token, type, actionData = null) => {
    const smtpTransport = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'waves.store.es@gmail.com',
            pass: process.env.EMAIL_PASS
        }
    });

    const mail = getEmailData(to, name, token, type, actionData);

    smtpTransport.sendMail(mail, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent');
        }
        smtpTransport.close();
    });
}

module.exports = { sendEmail }