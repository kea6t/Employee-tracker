const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');


// 
const init = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'confirm',
            message: 'What would you like to do? ',
            choices: ["View all Employees",
                "Add Employee",
                "View All Employees by Department",
                "View All Departments",
                "Add Department",
                'Delete Employee',
                "View All Roles",
                "Update Employee Role",
                "Add Role",
                "Exit"]
        }
    ])
    .then((response) => {
        console.log(response);
        let userChoice = response.confirm;
        console.log(userChoice);
        switch(userChoice){
         case 'View all Employees':
             viewEmployees();
             break;
         case 'Add Employee':
             addEmployee();
             break;
         case 'View All Employees by Department':
             viewEmpDepartment();
             break;
         case 'View All Departments':
             viewDepartments();
             break;
         case 'Add Department':
             addDepartment();
             break;
         case 'Delete Employee':
             deleteEmployee();
             break;
         case 'View All Roles':
             viewAllRoles();
             break;
         case 'Update Employee Role':
             updateEmpRole();
             break;
         case 'Add Role':
             addRole();
             break;
         case 'Exit':
             db.end();
             break; 
        }
     });
};

// Function to view all employees in the database.
function viewEmployees() {
    const sql = `SELECT employee.*, roles.title, roles.salary, department.name as department, manager.first_name, manager.last_name 
                FROM employee
                LEFT JOIN roles ON employee.role_id = roles.id
                INNER JOIN department ON roles.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id
                GROUP BY employee.id`;
    db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.table(results);
        init();
    });
};

function addEmployee() {
    const sql = `SELECT employees.*, 
                FROM employee
                LEFT JOIN role ON employee.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id
                GROUP BY employee.id ORDER BY count DESC`;
    db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.table(results);
        init();
    });
};

function viewEmpDepartment() {
    const sql = `SELECT employees.*, 
                FROM employee
                LEFT JOIN role ON employee.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id
                GROUP BY employee.id ORDER BY count DESC`;
    db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.table(results);
        init();
    });
};

function viewDepartments() {
    const sql = `SELECT employees.*, 
                FROM employee
                LEFT JOIN role ON employee.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id
                GROUP BY employee.id ORDER BY count DESC`;
    db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.table(results);
        init();
    });
};

function addDepartment() {
    const sql = `SELECT employees.*, 
                FROM employee
                LEFT JOIN role ON employee.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id
                GROUP BY employee.id ORDER BY count DESC`;
    db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.table(results);
        init();
    });
};

function deleteEmployee() {
    const sql = `SELECT employees.*, 
                FROM employee
                LEFT JOIN role ON employee.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id
                GROUP BY employee.id ORDER BY count DESC`;
    db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.table(results);
        init();
    });
};

function viewAllRoles() {
    const sql = `SELECT employees.*, 
                FROM employee
                LEFT JOIN role ON employee.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id
                GROUP BY employee.id ORDER BY count DESC`;
    db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.table(results);
        init();
    });
};

function updateEmpRole() {
    const sql = `SELECT employees.*, 
                FROM employee
                LEFT JOIN role ON employee.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id
                GROUP BY employee.id ORDER BY count DESC`;
    db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.table(results);
        init();
    });
};

function addRole() {
    const sql = `SELECT employees.*, 
                FROM employee
                LEFT JOIN role ON employee.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id
                GROUP BY employee.id ORDER BY count DESC`;
    db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.table(results);
        init();
    });
};

// Function call to initialize app
init();