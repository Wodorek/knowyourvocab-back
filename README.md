# Knowyourvocab-back

The backend part of [knowyourvocab](https://github.com/Wodorek/knowyourvocab)

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

A backed part of vocabulary assesment test I created to help my teacher girlfriend with the trasition from on-site to remote teaching.

This contains saving the test to database, retriving list of all students with time and date of creation and getting specific students data.

## Technologies used

- [Typescript](https://github.com/microsoft/TypeScript) v4.2.3
- [Express](https://github.com/expressjs/express) v4.17.1
- [Mongoose](https://github.com/Automattic/mongoose) v5.12.2
- [Passport](https://github.com/jaredhanson/passport) v0.4.1
- [Nodemailer](https://github.com/nodemailer/nodemailer) v6.6.0

## Setup

To run this project locally, clone it and install using npm:

```
$cd ../knowyourvocab-back
$npm install
```

then, you will need to create a **nodemon.json** file, containing **"env"** object with following properties:

- "DB_NAME": your mongoDB database name
- "DB_PASSWORD": database password
- "DB_USER": database user
- "JWT_STRING": jwt token secret string
- "VERIFICATION_STR": a string to give to users that are allowed to register
- "WEBSITE_URL": fronted site address, for CORS

Additionally, if you want mailing notifications to work:

- "MAILING_LIST": string with comma-separated email adresses, where to send notification
- "EMAIL_HOST": string with smtp email provider
- "EMAIL_USER": email adress
- "EMAIL_PASS": email password

Finally, run it using npm:

```
$npm run startdev
```
