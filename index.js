const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require ('console.table');


// view all departments
const viewAllDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
        if (err) {
            throw err; 
        }
        console.table('View all departments', res);
        startPrompt ();
    });
};

// add a department
const addDepartment = (answer) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [answer.name];

    db.promise().query(sql, params, (err, res) => {
        if (err) {
            throw err;
        }
        
    })
    .then(viewAllDepartments());
};

// view all roles
const viewAllRoles = () => {
    const sql = `SELECT roles.id, roles.title, department.name AS department_name, roles.salary
    FROM ROLES
    LEFT JOIN department
    ON roles.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table('View all roles', rows);
        startPrompt();
    });    
};

// add a role
const addRole = (answers) => {
    const sql = `INSERT INTO roles (title, department_id, salary) VALUES(?,?,?)`;
    const params = [answers.title, answers.department_id, answers.salary];

    db.promise().query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
    } )
    .then(viewAllRoles())
};

// view all employees
const viewAllEmployees = () => {
    const sql = `SELECT e.id AS id,
     e.first_name AS first_name, 
    e.last_name AS last_name,
     roles.title AS roles,
      department.name AS department_name, 
    roles.salary AS salary,
     CONCAT(manager.first_name," ",manager.last_name ) AS manager
    FROM employee AS e
    LEFT JOIN roles 
    ON e.role_id = roles.id
    LEFT JOIN department
    ON roles.department_id = department.id
    LEFT JOIN employee AS manager
    ON e.manager_id = manager.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table('View all employees', rows);
        startPrompt()
    });
};

// add an employee
const addEmployee = (answers) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`;
    const params = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id];

    db.promise().query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
    })
    .then(viewAllEmployees())
};

// update employee role
const updateEmployeeRole = (answers) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [answers.role_id, answers.id];

    db.promise().query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
    })
    .then(viewAllEmployees())
};

const addDepartmentPrompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('please enter a name');
                    return false;
                }
            }
        }
    ])
        .then(answer => addDepartment(answer));
};

const addRolePrompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please include a role',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please include a title');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Please include a salary, eg., 20000.00 ',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('please enter the salary as a number');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'department_id',
            message: 'Please enter the department id for the role',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please include a department id');
                    return false;
                }
            }
        }
    ])
        .then(answers => addRole(answers));
}

const addEmployeePrompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Please include a first name',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please include a first name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please include a last name',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please include a last name');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'role_id',
            message: 'Please enter the role id for the employee',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please include a role id');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirm_manager',
            message: 'Does the employee have a manager?',
            default: 'false'

        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'Please enter the manager id for the employee.',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please include a role id');
                    return false;
                }
            }
        }

    ])
        .then(answers => addEmployee(answers));
}


const updateEmployeeRolePrompt = () => {
    inquirer.prompt([
        {
            input: 'number',
            name: 'id',
            message: 'What is the id of the employee you want to update?',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please include an id');
                    return false;
                }
            }
        },
        {
            input: 'number',
            name: 'role_id',
            message: 'What is the id of the new role you want to assign the employee?',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please include an id');
                    return false;
                }
            }
        }
    ]).then(answers => updateEmployeeRole(answers));
}



const startPrompt = () => {
    inquirer.prompt(
       
        [
        {
            type: 'list',
            name: 'employee_tracker',
            choices: ['View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update the role of an employee',
                'Quit']
        }

    ]).then(answer => {
        if(answer.employee_tracker === 'View all departments') {
            viewAllDepartments();
        } else if (answer.employee_tracker === 'View all roles') {
            viewAllRoles();
        } else if(answer.employee_tracker === 'View all employees') {
            viewAllEmployees();
        } else if(answer.employee_tracker === 'Add a department') {
            addDepartmentPrompt();
        } else if (answer.employee_tracker === 'Add a role') {
            addRolePrompt();
        } else if (answer.employee_tracker === 'Add an employee') {
            addEmployeePrompt();
        } else if (answer.employee_tracker === 'Update the role of an employee') {
            updateEmployeeRolePrompt();
        } else {
            db.end();
        }

    })
}


startPrompt();

