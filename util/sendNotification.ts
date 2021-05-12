import nodemailer from 'nodemailer';

export const sendNotification = async (username: string) => {
  let transporter = nodemailer.createTransport({
    host: `${process.env.EMAIL_HOST}`,
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.EMAIL_USER}`,
      pass: `${process.env.EMAIL_PASS}`,
    },
  });

  let info = await transporter.sendMail({
    from: 'Knowyourvocab',
    to: `${process.env.MAILING_LIST}`,
    subject: `${username} uzupełniła diagnozę!`,
    html: `<a href="https://knowyourvocab.netlify.app/admin/students/${username}">Sprawdź wyniki tutaj</a>`,
  });
};
