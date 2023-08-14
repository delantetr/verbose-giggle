const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const fs = require('fs').promises;

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

    switch (answer.action) {
        case 'View all departments':
        const departments = await db.query('SELECT * FROM department');
        console.table(departments[0]);
        break;
        case 'View all roles':
        const roles = await db.query('SELECT * FROM role');
        console.table(roles[0]);
        break;
        case 'View all employees':
        const employees = await db.query('SELECT * FROM employee');
        console.table(employees[0]);
        break;


        case 'Add a department':
        const departmentName = await inquirer.prompt([
            {
            type: 'input',
            name: 'name',
            message: 'Enter the department name:'
            }
        ]);
        await db.query('INSERT INTO department (name) VALUES (?)', [departmentName.name]);
        console.log('Department added successfully.');
        break;


        case 'Add a role':
        const roleDetails = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the role title:'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter the role salary:'
            },
            {
                type: 'number',
                name: 'department_id',
                message: 'Enter the department ID for this role:'
            }
        ]);
        await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleDetails.title, roleDetails.salary, roleDetails.department_id]);
        console.log('Role added successfully.');
        break;


        case 'Add an employee':
        const employeeDetails = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the employee\'s first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the employee\'s last name:'
        },
        {
            type: 'number',
            name: 'role_id',
            message: 'Enter the role ID for this employee:'
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'Enter the manager ID for this employee:'
        }
        ]);
        await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employeeDetails.first_name, employeeDetails.last_name, employeeDetails.role_id, employeeDetails.manager_id]);
        console.log('Employee added successfully.');
        break;

        
        case 'Update an employee role':
        const updateDetails = await inquirer.prompt([
            {
            type: 'number',
            name: 'new_role_id',
            message: 'Enter the new role ID for this employee:'
            },
            {
            type: 'number',
            name: 'new_employee_id',
            message: 'Enter the new employee ID for this employee:'
            }
        ]);
        await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [updateDetails.new_role_id, updateDetails.new_employee_id]);
        console.log('Employee role updated successfully.');
        break;
          
        
        case 'Exit':
        console.log('Exiting the application.');
        break;
    }
};

  mainApp();