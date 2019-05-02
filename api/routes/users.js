
import express from 'express';
import jwt from 'jsonwebtoken';
import short from 'short-uuid';
import joi from 'joi';

const router = express.Router();
const appSecreteKey = 'hksuua7as77hjvb348b3j2hbrbsc9923k';

const users = [{
  id: 'QK-588A979LL3M',
  email: 'job@gmail.com',
  firstName: 'job',
  lastName: 'ogins',
  adress: 'kigali',
  password: 'Kanyanyama01',
}];


// signup route
router.post('/auth/signup', (req, res, next) => {
  // joi validation shema
  const schema = {
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    adress: joi.string().min(3).required(),
    password: joi.string().min(3).required(),
    email: joi.string().min(3).required(),
  };
  const result = joi.validate(req.body, schema);
  // input validation
  if (result.error) { res.status(400).send({ message: result.error.details[0].message }); }

  next();
},
  // check if user exists
  (req, res, next) => {
    const user = users.find(u => u.email === req.body.email);
    if (user) res.status(409).send({ message: `user ${user.email} already exists ` });

    next();
  },

  (req, res) => {
    // token const
    const token = jwt.sign({ email: req.body.email, password: req.body.password }, appSecreteKey, { expiresIn: '1hr' });
    const user = {
      status: 1,
      data: {
        id: short.generate(),
        token,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        adress: req.body.adress,
        isAdmin: false,
      },
    };
    users.push(user);
    res.status(201).send(user);
  },
);

// signin route
router.post('/auth/signin', (req, res, next) => {
  // token const
  const token = jwt.sign({ email: req.body.email, password: req.body.password }, appSecreteKey, { expiresIn: '1hr' });
  // check for the details existance
  const user = users.find(u => u.email === req.body.email);
  if (user.password !== req.body.password) {
    res.status(200).send({ message: 'Auth failed,invalid details' });
  } else {
    user.token = token;
    res.send(user);
  }
});

export default router;
