 const express = require('express');
 const router = express.Router();
 const authRoutes = require('./authRoutes');
 const budgetRoutes = require('./budgetRoutes');
 const dashboardRoutes = require('./dashboardRoutes');
 const expensesRoutes = require('./expensesRoutes');


 router.use('/auth', authRoutes);
 router.use('/budget', budgetRoutes);
 router.use('/dashboard', dashboardRoutes);
 router.use('/expenses', expensesRoutes);

 module.exports = router;
