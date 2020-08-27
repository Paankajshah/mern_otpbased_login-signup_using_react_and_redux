const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const bcrypt = require('bcrypt')
const decode = require('jwt-decode')
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxd56c5b7303854a60adb7687fea40b24c.mailgun.org';
const mg = mailgun({apiKey: '8460cd11ef766f5ed68751e9231f8f6f-4d640632-fe2f18de', domain: DOMAIN});

const User = require('../models/User')
users.use(cors())
process.env.SECRET_KEY = 'pankaj'

users.get('/' , async(req , res ) =>{
  const users = await User.find();
  res.json(users);
})

users.post('/register', (req, res) => {
    
  const ranNum = Math.floor((Math.random()*1000000)+1)
  const today = new Date();
  const schema = Joi.object().keys({
    first_name: Joi.string().min(1).max(50).required(),
    last_name: Joi.string().min(1).max(50).required(),
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(1).max(255).required(),
      });

      const { error } = schema.validate(req.body)
  // console.log(error);
  //  ,(err,result)=>{
  //   if(err){
  //       console.log(err);
  //       res.send('Invalid Email');
  //   }
  //   else{
  //       console.log(result);
  //       //res.send('successfully posted data');
  //   }
    

  // const { error } = validateEmail(req.body); 
  // console.log(dataaa);
  if (error) return res.send(error.details[0].message);

  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    otp :ranNum,
    created: today
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        const messageData = {
          from: 'Authenticate <pshah9411@gmail.com>',
          to: userData.email,
          subject: 'pankaj',
          text: `Your OTP code is ${ranNum}`
        };
        mg.messages().send(messageData, function (error, body) {
          console.log(body);
        });
              let token = jwt.sign(userData,process.env.SECRET_KEY, {
                expiresIn: 1460
              })

              const data= {
                token: token,
                userData : userData
              }
              res.send(data);
             // res.json({ status: user.email + 'Registered!' })
        
        
      } else {
        res.send('User already exists')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/verify', (req , res )=>{

  const { token , otpCode } = req.body;
  const tokenData= decode(token)
  const { otp } = tokenData;
  const today = new Date()


  const userData = {
    first_name: tokenData.first_name,
    last_name: tokenData.last_name,
    email: tokenData.email,
    password: tokenData.password,
    created: today

  }
  if(otp.toString() === otpCode){
    User.findOne({
      email: userData.email
    })
      .then(user => {
        if (!user) {
          bcrypt.hash(userData.password, 10, (err, hash) => {
            userData.password = hash
            User.create(userData)
              .then(user => {
                let token = jwt.sign(userData, process.env.SECRET_KEY, {
                  expiresIn: 1460
                })
                res.send(token);
               // res.json({ status: user.email + 'Registered!' })
              })
              .catch(err => {
                res.send('error: ' + err)
              })
          })
        } else {
          res.send('User already exists')
        }
      })

  }
  else{
    res.send('Invalid Otp');
  }
  console.log(typeof(otp) , typeof(otpCode))

})

users.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 30
          })
          res.json(token);
        } else {
          // Passwords don't match
          res.json({ error: 'User does not exist' })
        }
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/profile', (req, res) => {
  try{
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    console.log(decoded);
    User.findOne({
      _id: decoded._id
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.status(401).send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
 
  catch(err){
    res.send(err)

  }

})

function validateEmail(mail) {
  const schema = {
      email: Joi.string().min(4).max(255).required().email(),
  
  };

  return Joi.assert(mail, schema);
}

module.exports = users
