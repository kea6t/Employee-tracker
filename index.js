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
    ]);
}

// function to create team members
const manageEmployee = () => {
    inquirer
        .prompt(init)
        .then((response) => {
           switch(response){
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

function viewEmployees() {
    const sql = `SELECT first_name, last_name, role_id, manager_id, title, department_id, salary 
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