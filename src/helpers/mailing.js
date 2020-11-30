const nodemailer = require('nodemailer');

class SendMail{
  constructor(){
    this.transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.NODEMAILER_EMAIL}`,
        pass: `${process.env.NODEMAILER_PASSWORD}`
      }
    });
  }

  async sendEmailForVarification(user){
    const linkForVarification = `${process.env.DOMAIN_ADDRESS}/auth/verify/${user.verificationToken}`;

    return this.transport.sendMail({
      from: 'kopchuk.kateryna@gmail.com', 
      to: `${user.email}`,
      subject: 'nodemailer',
      html: `<p>Please open this <a href='${linkForVarification}'>link</a> and varify your email</p>`
    })
  }
}

exports.mailing = new SendMail();

