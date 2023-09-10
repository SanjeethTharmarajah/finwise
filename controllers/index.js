// loads required modules
const express = require('express');
const router = express.Router();
const Expenses = require('../models/Expenses');
const Budget = require('../models/Budget');
const authRoutes = require('../controllers/api/authRoutes');
 const budgetRoutes = require('../controllers/api/budgetRoutes');
 const expensesRoutes = require('../controllers/api/expensesRoutes');


 router.use('/auth', authRoutes);
 router.use('/budget', budgetRoutes);
 router.use('/expenses', expensesRoutes);

// Home page
router.get('/', async (req, res) => {
  res.render('home');
});
// About page
router.get('/about', async (req, res) => {
  res.render('about');
});
//How to use page
router.get('/how', async (req, res) => {
  res.render('howtouse');
});
// Budget page
  router.get('/budget', async (req, res) => {
    const userId = req.session.userId; 
    const postUser = req.session.userName;
    if (userId !== undefined) {
      try{
        const budgets = await Budget.findOne({ where: { user: postUser } });
        
        if(budgets.user==postUser){
          const budgets2 = budgets.toJSON();
          res.render('budget', {budgets2});
        }
      }
      catch (error) {
        res.render('budget');
      }
    }
    else {
      // Handle case where userId is undefined
      res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/auth/login">Go To Login Page</a></font></center>');
    }
 });
 //shows expenses
 router.get('/expenses', async (req, res) => {
    const userId = req.session.userId; 
    const postUser = req.session.userName;
    if (userId !== undefined) {
      res.render('expenses');
    }
    else {
      // Handle case where userId is undefined
      res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/auth/login">Go To Login Page</a></font></center>');
    }
});

//Dashboard page

router.get('/dashboard', async (req, res) => {
  const userId = req.session.userId; 
  const postUser = req.session.userName;
  if (userId !== undefined) {
    const expenses = await Expenses.findAll({ where: { user: postUser } });
    const expenses2 = expenses.map((expenses) =>
    expenses.get({ plain: true })
    );
    const budgets = await Budget.findAll({ where: { user: postUser } });
    const budgets3 = budgets.map((budgets) =>
    budgets.get({ plain: true })
    );
    res.render('dashboard', { budgets3, expenses2 });
  }
  else {
    // Handle case where userId is undefined
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/auth/login">Go To Login Page</a></font></center>');
  }
});


//data insights
router.get('/datainsights', async (req, res) => {
  const userId = req.session.userId; 
  const postUser = req.session.userName;
  if (userId !== undefined) {
    const expenses = await Expenses.findAll({ where: { user: postUser } });
    const expenses2 = expenses.map((expenses) =>
    expenses.get({ plain: true })
    );
    const budgets = await Budget.findAll({ where: { user: postUser } });
    const budgets3 = budgets.map((budgets) =>
    budgets.get({ plain: true })
    );
    res.render('datainsights', { budgets3, expenses2 });
  }
  else {
    // Handle case where userId is undefined
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/auth/login">Go To Login Page</a></font></center>');
  }
});

//transaction history
router.get('/transactionhistory', async (req, res) => {
  const userId = req.session.userId; 
  const postUser = req.session.userName;
  if (userId !== undefined) {
    const expenses = await Expenses.findAll({ where: { user: postUser } });
    const expenses2 = expenses.map((expenses) =>
    expenses.get({ plain: true })
    );
    const budgets = await Budget.findAll({ where: { user: postUser } });
    const budgets3 = budgets.map((budgets) =>
    budgets.get({ plain: true })
    );
    res.render('transactions', { budgets3, expenses2 });
  }
  else {
    // Handle case where userId is undefined
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/auth/login">Go To Login Page</a></font></center>');
  }
});
// exports router
module.exports = router;
