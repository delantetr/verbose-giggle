const mysql = require('mysql2/promise');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
  },
);

async function mainApp() {
    console.log('Welcome to the Employee Database Management System');
  
    try {
      console.log('Connected to the database.');
      await displayMainMenu();
    } catch (err) {
      console.error('Error:', err);
    } finally {
      db.end();
    };
  };

async function displayMainMenu() {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
              'View all departments',
              'View all roles',
              'View all employees',
              'Add a department',
              'Add a role',
              'Add an employee',
              'Update an employee role',
              'Exit'
            ]
          }
    ]);
};

  mainApp();