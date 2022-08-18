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
                "View All Departments",
                "Add Department",
                'Delete Employee',
                'Delete Roles',
                'Delete Department',
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
            switch (userChoice) {
                case 'View all Employees':
                    viewEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
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
                case 'Delete Roles':
                    deleteRoles();
                    break;
                case 'Delete Employee':
                    deleteDepartment();
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
        if (err) {
            throw err;
        }
        console.table(results);
        init();
    });
};

// function to add employee with a role and a manager in the database
function addEmployee() {
    const addEmpSql = `SELECT employee.*, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN roles ON roles.id = employee.role_id
    INNER JOIN department ON department.id = roles.department_id
    ORDER BY employee.id`;
    db.query(addEmpSql, (err, results) => {
        if (err) {
            throw err;
        }
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "Enter Employees's first name! (Required)",
                    validate: firstNameInput => {
                        if (firstNameInput) {
                            return true;
                        } else {
                            console.log("Please enter your Employee's first name!");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "Enter Employees's last name! (Required)",
                    validate: lastNameInput => {
                        if (lastNameInput) {
                            return true;
                        } else {
                            console.log("Please enter your Employee's last name!");
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'confirmRole',
                    message: "Enter Employees's role! (Required)",
                    choices: results.map(confirmRole => {
                        return {
                            name: confirmRole.title,
                            value: confirmRole.role_id
                        }
                    }),
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log("Please enter your Employee's Role! ");
                            return false;
                        }
                    }
                },
                {
                    type: 'number',
                    name: 'employeeManager',
                    message: "Please enter the managers id? (Required)",
                    choices: results.map(employeeManager => {
                        return {
                            value: employeeManager.manager_id
                        }
                    }),
                    validate: empMgrInput => {
                        if (empMgrInput) {
                            return true;
                        } else {
                            console.log("Please enter your manager's id!");
                            return false;
                        }
                    }
                }
            ])
            .then(response => {
                console.log(response);
                const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id )
                VALUES(?,?,?,?)`;
                const params = [response.firstName, response.lastName, response.confirmRole, response.employeeManager];
                db.query(sql, params, (err, results) => {
                    if (err) {
                        throw err;
                    }
                    console.table(results);
                    init();
                });
            })
    })

};

// function to view all departments in the database
function viewDepartments() {
    const sql = `SELECT *
                FROM department
                ORDER by id ASC`;
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results);
        init();
    });
};

// function to add a new department to the database
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addDept',
                message: "Enter which department you'd like to add! (Required)",
                validate: deptInput => {
                    if (deptInput) {
                        return true;
                    } else {
                        console.log("Please enter your Department of choice!");
                        return false;
                    }
                }
            }
        ])
        .then((response) => {
            const sql = `INSERT INTO department(name)
                    VALUES(?)`;
            const params = [response.addDept];
            db.query(sql, params, (err, results) => {
                if (err) {
                    throw err;
                }
                console.table(results);
                init();
            });
        })
};

// function to delete employees from the database.
function deleteEmployee() {
    const delEmpSql = `SELECT * FROM employee`;
    db.query(delEmpSql, (err, results) => {
        if (err) {
            throw err;
        }
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'confirmEmployee',
                    message: "Enter which employee you'd like to delete! (Required)",
                    choices: results.map(confirmEmployee => {
                        // figured out how to combine first and last name from employee table.
                        // results will map the employee table and users can select the full name from the table.
                        return {
                            name: `${confirmEmployee.first_name} ${confirmEmployee.last_name}`,
                            value: confirmEmployee.id
                        }
                    }),
                    validate: empInput => {
                        if (empInput) {
                            return true;
                        } else {
                            console.log("Please enter the employee to delete!");
                            return false;
                        }
                    }
                }
            ])
            .then((response) => {
                const sql = `DELETE FROM employee WHERE id = ?`;
                const params = [response.confirmEmployee];
                db.query(sql, params, (err, results) => {
                    if (err) {
                        throw err;
                    }
                    console.table(results);
                    init();
                });
            });
    });
};

// function to delete employees from the database.
function deleteRoles() {
    const delRoleSql = `SELECT title AS name , id AS VALUE
                        FROM roles
                        ORDER BY name ASC`;
    db.query(delRoleSql, (err, results) => {
        if (err) {
            throw err;
        }
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'confirmRole',
                    message: "Enter which role you'd like to delete! (Required)",
                    choices: (results),
                    validate: empInput => {
                        if (empInput) {
                            return true;
                        } else {
                            console.log("Please enter the roles to delete!");
                            return false;
                        }
                    }
                }
            ])
            .then((response) => {
                const sql = `DELETE FROM roles`;
                const params = [response.confirmRole];
                db.query(sql, params, (err, results) => {
                    if (err) {
                        throw err;
                    }
                    console.table(results);
                    init();
                });
            });
    });
};

// function to view all roles in the database
function viewAllRoles() {
    const sql = `SELECT roles.id, roles.title, department.name AS department, roles.salary
                FROM roles
                INNER JOIN department ON roles.department_id = department.id
                ORDER by id ASC`;
    db.query(sql, (err, results) => {
        if (err) {
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
        if (err) {
            throw err;
        }
        console.table(results);
        init();
    });
};

// function to add new roles and salary of that role to the database
function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addRole',
                message: "Enter the role you'd like to add! (Required)",
                validate: input => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter a role!");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addSalary',
                message: "Enter the salary for the role! (Required)",
                validate: input => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter a salary!");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addDeptId',
                message: "Enter the department Id for the role! (Required)",
                validate: input => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter a department Id!");
                        return false;
                    }
                }
            }
        ])
        .then((response) => {
            const sql = `INSERT INTO roles(title, department_id, salary)
                    VALUES(?, ?, ?)`;
            const params = [response.addRole, response.addDeptId, response.addSalary];
            db.query(sql, params, (err, results) => {
                if (err) {
                    throw err;
                }
                console.table(results);
                init();
            });
        })
};

// Function call to initialize app
init();