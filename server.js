// loads required modules
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const sequelize = require('./config/connection');
const User = require('./models/User.js');
const Budget = require('./models/Budget.js');
const Expenses = require('./models/Expenses.js');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false
}));
//handle bars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
// Sync models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Routes
 app.use('/', require('./controllers/index'));
 app.use('/auth', require('./controllers/api/authRoutes'));
 app.use('/budget', require('./controllers/api/budgetRoutes'));
 app.use('/expenses', require('./controllers/api/expensesRoutes'));

// Start the server
//const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
});
