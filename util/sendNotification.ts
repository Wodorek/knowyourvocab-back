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
    from: '<knowyourvocab@gmail.com>',
    to: `${process.env.MAILING_LIST}`,
    subject: `${username} uzupełniła diagnozę!`,
    text: `${username} właśnie wysłała diagnozę! Sprawdź dokładne wyniki w panelu administratora:`,
  });
};
