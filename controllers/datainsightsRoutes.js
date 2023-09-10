const router = require('express').Router();
const { Budget, Expenses, User } = require('../models');

//data insights
router.get('/datainsights', async (req, res) => {
    const userId = req.session.userId; 
    const userName = req.session.userName;
    if (userId !== undefined) {
      const expenseData = await Expenses.findAll({ where: { user: userName } });
      const expenses = expenseData.map((expense) => expense.get({ plain: true }));
  
      const budgetData = await Budget.findAll({ where: { user: userName } });
      const budget = budgetData.map((budget) => budget.get({ plain: true }));
  
      // Prepare data for the chart (e.g., extract labels and values)
      const labels = expenses.map((expense) => expense.category);
      const values = expenses.map((expense) => expense.amount);
      labels.push(`Monthly Budget`);
      values.push(budget[0].monthlybudgetlimit);
  
      const pieChartData = {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: 'blue',
        }],
      };

      console.log(pieChartData);
  
      // Render the Handlebars template with the chart
      res.render('datainsights', {
        expenseChartData: pieChartData, // Convert data to a JSON string
      });
    }
    else {
      // Handle case where userId is undefined
      res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/">Go Back</a></font></center>');
    }
  });

module.exports = router;