
// const connection = require('./db/connection');

const { prompt } = require('inquirer');


const db = require('./db');

function Firstprompts() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit'
            ]
        }
    ])
        .then((answers) => {
            switch (answers.choice) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Quit':
                    quit();
                    break;
            }
        })
}


function viewAllDepartments() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log('\n');
            console.table(departments);
        }
    )
        .then(() => Firstprompts());
}

function addEmployee() {
    db.findAllRoles().then(([rows]) => {
        let roles = rows;
        const rolelist = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));
        prompt([
            {
                name: 'first_name',
                message: 'What is the employees first name?'
            },
            
            {
                name: 'last_name',
                message: 'What is the employees last name?'
            },
            {
                type: "list",
                name: "role_id",
                message: "What is the employees role?",
                choices: rolelist
            },
        ])
            .then(res => {
                let employee = res;
                db.addEmployees(employee)
            })
            .then(() => console.log(`Added  to the database`))
            .then(() => Firstprompts());
    })
}
            

function viewAllRoles() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log('\n');
            console.table(roles);
        })
    .then(() => Firstprompts());
}

function viewAllEmployees() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => Firstprompts());
}

function addDepartment() {
    prompt([
        {
            name: 'department_name',
            message: 'What is the name of the department?'
        }
    ])
        .then(res => {
            let department = res;
            db.addDepartment(department)
      
        .then(() => console.log(`Added ${department.department_name} to the database`))
                .then(() => Firstprompts());
        })
}
        
function addRole() {
    db.findAllDepartments().then(([rows]) => {
        let departments = rows;
                const departmentlist = departments.map(({ id, department_name }) => ({
                  name: department_name,
                  value: id
                }));
        
        
        
    prompt([
        {
            name: 'title',
            message: 'What is the name of the role?',
        }, {
            name: 'salary',
            message: 'What is the salary of the role?'
            
        },

        {
            type: "list",
            name: "department_id", 
            message: "What department belongs to?",
            choices: departmentlist
        },
    ])
        .then(res => {
            let role = res;
            db.addRole(role)
        })
        .then(() => console.log(`Added to the database`))
            .then(() => Firstprompts());
        })
}


function updateEmployeeRole() {
    db.findAllEmployees().then(([rows]) => {
        let employees = rows;
        const employeeChoices= employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
    
        prompt([
        {
            type: "list",
            name: "employee_id",
            message: "What is the employee new departmentId?",
            choices: employeeChoices
            }
      ]).then(res => {
            let employeeId = res.employee_id;

            db.findAllRoles().then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));
                prompt([
                    {
                        type: "list",
                        name: "role_id",
                        message: "Select the new role for the employee:",
                        choices: roleChoices
                    }
                ]).then(res => {
                    let roleId = res.role_id;
                    db.updateEmployeeRole(employeeId, roleId)
                        .then(() => console.log('Updated employee role'))
                        .then(() => Firstprompts());
                });
            });
        });
    });
}



Firstprompts();


