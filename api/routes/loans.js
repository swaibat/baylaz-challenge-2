import express from 'express';
import short from 'short-uuid';

const router = express.Router();

const loans = [
  {
    id: 'QK-588A979LL3M',
    user: 'jobgmail.com',
    createdOn: 1556793783791,
    status: 'pending',
    repaid: false,
    tenor: 50,
    amount: 1200.7,
    paymentInstallment: 10.6,
    balance: 300,
    interest: 15,
  }];
// user can apply for a loan


// post loan application
router.post('/', (req, res, next) => {
  // check if a user has a pending loan or curent loan or rejected loan  application
  const result = loans.find(a => a.user === req.body.email);
  if (result) res.status(409).send({ message: 'You already applied for a loan. you can request for ​only​ one loan at a time ' });
  next();
}, (req, res) => {
  // post the loan
  const loan = {
    status: 1,
    data: {
      id: short.generate(),
      user: req.body.user,
      createdOn: Date.now(),
      status: 'pending',
      repaid: false,
      tenor: req.body.tenor,
      amount: req.body.amount,
      paymentInstallment: (req.body.amount + req.body.interest) / req.body.tenor,
      balance: 63,
      interest: (15 / 100) * req.body.amount,
    },
  };

  loans.push(loan);
  res.status(201).send(loan);
});


export default router;
