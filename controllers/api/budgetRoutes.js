// loads required modules
const express = require('express');
const router = express.Router();
const Budget = require('../../models/Budget');


// Add Budget
router.post('/createbudget', async (req, res) => {
  const userId = req.session.userId; 
  const postUser = req.session.userName;
  if (userId !== undefined) {
      const monthlyincome = req.body.monthlyincome;
      const monthlybudgetlimit = req.body.monthlybudgetlimit;
      let timestamp = Date.now();
      const budgets = await Budget.findOne({ where: { user: postUser } });
      
      
      try {
        if(budgets.user==postUser){
          budgets.monthlyincome = monthlyincome;
          budgets.monthlybudgetlimit = monthlybudgetlimit;
          await budgets.save();
  
        }
        else {
          await Budget.create({
            monthlyincome: monthlyincome,
            monthlybudgetlimit: monthlybudgetlimit,
            user: req.session.userName,
            date: timestamp,
          });
        }
      }
      catch (error) {
        await Budget.create({
          monthlyincome: monthlyincome,
          monthlybudgetlimit: monthlybudgetlimit,
          user: postUser,
          date: timestamp,
        });
    }
    res.redirect('/budget');
    }
    else {
      // Handle case where userId is undefined
      res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/auth/login">Go To Login Page</a></font></center>');
    }
    
});
// exports router
module.exports = router;

