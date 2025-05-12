import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
    service :"gmail",
    auth :{
        user: 'vardonreddy@gmail.com',      // 👈 Your email
        pass: 'ttua pkgm kvih rpzy'  // 👈 App password (if using Gmail) 
    }
});

const templatePath = path.join(process.cwd(), 'emailTemplate.html');
let template = fs.readFileSync(templatePath, 'utf-8');

const users = [
  { name: 'Vardhan', email: 'vardhan.smart26@gmail.com' },
  { name: 'Chappidi', email: 'chappidivardhanreddy@gmail.com' }
];

users.forEach((user) => {
  // Replace placeholders with real data
  const htmlContent = template
    .replace('{{name}}', user.name)
    .replace('{{email}}', user.email);
const mailOptions = {
    from: 'vardonreddy@gmail.com',
    to: 'vardhan.smart26@gmail.com',
    subject: `Hello ${user.name} from Node.js!`,
    html: htmlContent
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error:', error);
    }
    console.log('Email sent:', info.response);
  });
});