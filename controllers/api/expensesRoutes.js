// loads required modules
const express = require('express');
const router = express.Router();
const Expenses = require('../../models/Expenses');
const Budget = require('../../models/Budget');

// Add Budget
router.post('/createexpenses', async (req, res) => {
  const userId = req.session.userId; 
  const postUser = req.session.userName;
  if (userId !== undefined) {
      const category = req.body.selectedcategory;
      const amount = req.body.amount;
      const description = req.body.description;
      let timestamp = Date.now();
      try {
        const expensescategory = await Expenses.findOne({ where: { user: postUser, category: category } });
        if(expensescategory.user==postUser && category == expensescategory.category){
          expensescategory.amount = amount;
          expensescategory.description = description;
          expensescategory.category = category;
          expensescategory.date = timestamp;
          await expensescategory.save();
        }
        else {
          await Expenses.create({
            amount: amount,
            description: description,
            category: category,
            user: req.session.userName,
            date: timestamp,
          });
        }
      }
      catch (error) {
        await Expenses.create({
          amount: amount,
          description: description,
          category: category,
          user: req.session.userName,
          date: timestamp,
        });
    }
    res.redirect('/expenses');
    }
    else {
      // Handle case where userId is undefined
      res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/auth/login">Go To Login Page</a></font></center>');
    }
});

// Add new expense
router.get('/trackexpenses', async (req, res) => {
    const userId = req.session.userId; 
    const postUser = req.session.userName;
    if (userId !== undefined) {
      //const budget = await Budget.findAll(req.session.userName);
      const expenses = await Expenses.findAll({ where: { user: postUser } });
      const expenses2 = expenses.map((expenses) =>
      expenses.get({ plain: true })
      );
      const budgets = await Budget.findAll({ where: { user: postUser } });
      const budgets3 = budgets.map((budgets) =>
      budgets.get({ plain: true })
      );
      res.render('trackexpenses', { budgets3, expenses2 });
    }
    else {
      // Handle case where userId is undefined
      res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/auth/login">Go To Login Page</a></font></center>');
    }
  });

  // edit expense
router.get('/edit', async (req, res) => {
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
      res.render('editexpenses', { budgets3, expenses2 });
    }
    else {
      // Handle case where userId is undefined
      res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/auth/login">Go To Login Page</a></font></center>');
    }
});
//edit expense by id
router.get('/editexpensebyid/:id', async (req, res) => {
  const postId = req.params.id;
  const userId = req.session.userId; 
  const postUser = req.session.userName;
  if (userId !== undefined) {
    const expenses = await Expenses.findAll({ where: { id: postId } });
    const expenses2 = expenses.map((expenses) =>
    expenses.get({ plain: true })
    );
    res.render('editexpenses2', { expenses2 });
  }
  else {
    // Handle case where userId is undefined
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/auth/login">Go To Login Page</a></font></center>');
  }
});
//handles edit post by id
router.post('/editexpenses/:id', async (req, res) => {
  const userId = req.session.userId; 
  const postUser = req.session.userName;
  if (userId !== undefined) {
    const category = req.body.selectedcategory;
    const amount = req.body.amount;
    const description = req.body.description;
    let timestamp = Date.now();
    try {
      const expensescategory = await Expenses.findOne({ where: { user: postUser, category: category } });
      if(category == expensescategory.category){
        expensescategory.amount = amount;
        expensescategory.description = description;
        expensescategory.category = category;
        expensescategory.date = timestamp;
        await expensescategory.save();
      }
    }
    catch (error) {
      const expenseid = req.params.id;
        const expensescategory2 = await Expenses.findOne({ where: { id: expenseid} });
        expensescategory2.amount = amount;
        expensescategory2.description = description;
        expensescategory2.category = category;
        expensescategory2.date = timestamp;
        await expensescategory2.save();
  }
  res.redirect('/expenses/edit');
  }
  else {
    // Handle case where userId is undefined
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/auth/login">Go To Login Page</a></font></center>');
  }
});
//deletes expense by id
router.get('/deleteexpensebyid/:id', async (req, res) => {
  const postId = req.params.id;
  const userId = req.session.userId;
  if (userId !== undefined) {
    const expense = await Expenses.findOne({ where: { id: postId } });

    if (!expense) {
      return res.redirect('/expenses/edit'); // Handle if the comment doesn't exist
    }

    await expense.destroy();
    res.redirect('/expenses/edit');
  } 
  else {
    // Handle case where userId is undefined
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/">Go Back</a></font></center>');
  }
});
// exports router
module.exports = router;

