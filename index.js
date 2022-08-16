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
    const sql = `SELECT employee.*, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN roles ON roles.id = employee.role_id
    INNER JOIN department ON department.id = roles.department_id
    ORDER BY employee.id`;
    db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.table(results);
        init();
    });
};

function addEmployee() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee
                LEFT JOIN employee manager on manager.id = employee.manager_id
                INNER JOIN roles ON roles.id = employee.role_id
                INNER JOIN department ON department.id = roles.department_id
                ORDER BY employee.id`;
    db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.table(results);
        init();
    });
};

function viewEmpDepartment() {
    const sql = `SELECT name, 
                FROM department
                INNER JOIN department ON department.id = roles.department_id
                ORDER BY employee.id`;
    db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.table(results);
        init();
    });
};

function viewDepartments() {
    const sql = `SELECT *
                FROM department
                ORDER by id ASC`;
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
    const sql = `SELECT roles.id, roles.title, department.name AS department, roles.salary
                FROM roles
                INNER JOIN department ON roles.department_id = department.id
                ORDER by id ASC`;
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