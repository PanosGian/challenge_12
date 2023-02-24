// Dependencies
const mysql = require('mysql');
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const chalk = require("chalk");
const db = require('./connection.js');
var cTable = require("console.table");


console.clear();

//Display logo screen:
console.log(
    logo({
        name: 'EMPLOYEE MANAGER',
        font: 'Standard',
        lineChars: 8,
        padding: 3,
        margin: 2,
    })
        .emptyLine()
        .right("version 1.0.0")
        .emptyLine()
        .render()
);

const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false)
      resolve()
    }))
  }

 db.connect(async function (err) {
    if (err) throw err;
    console.log(chalk.yellow("Welcome to the Employee Tracker! Press any key to continue:\n "));
     await keypress();
    menuQuestions();
});


// Beginning questions prompting user what action to take
async function menuQuestions() {
       inquirer.prompt([
        {
            type: "list",
            name: "menu",
            loop: false,
            message: "SELECT A MENU OPTION?",
            choices: [
                "View Departments",
                "View Roles",
                "View Employees",
                "Add Departments",
                "Add Roles",
                "Add Employee",
                "Update Employee Role",
                "Exit"],
        },
    ]).then(function (answer) {
        // Using the switch case statement to select one of many code blocks (cases) to be executed
        switch (answer.menu) {
            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "Add Departments":
                addDepartment();
                break;
            case "Add Roles":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRoles();
                break;
            case "Exit":
                db.end();
                break;
        }
    });
}


//================= SUPPORT FUNCTIONS:
//GET roles array from the roles table
async function selectRole() {
    return new Promise((resolve, reject) => {
        var roleArr = [];
        db.query("SELECT * FROM role", function (err, res) {
            if (err) reject(err);
            for (var i = 0; i < res.length; i++) {
                roleArr.push(res[i].title);
            }
            resolve(roleArr);
        });
    });
}
//GET rmanagers array from the managers table
async function selectManager() {
    return new Promise((resolve, reject) => {
        var managerArr = [];
        db.query("SELECT first_name, last_name FROM employee", function (err, res) {
            if (err) reject(err);
            for (var i = 0; i < res.length; i++) {
                managerArr.push(res[i].last_name);
            }
            resolve(managerArr);
        });
    });
}

//GET departments array from the departments table
async function selectDepartment() {
    return new Promise((resolve, reject) => {
        var departmentArr = [];
        db.query("SELECT * FROM department", function (err, res) {
            if (err) reject(err);
            for (var i = 0; i < res.length; i++) {
                departmentArr.push(res[i].department_name);
            }
            resolve(departmentArr);
        });
    });
}

//GET an amployee names array from the employee table
async function selectEmployee() {
    return new Promise((resolve, reject) => {
        var employeeArr = [];
        db.query("SELECT first_name, last_name FROM employee", function (err, res) {
            if (err) reject(err);
            for (var i = 0; i < res.length; i++) {
                employeeArr.push(`${res[i].first_name} ${res[i].last_name}`);
            }
            resolve(employeeArr);
        });
    });
}

//MAIN MENU FUNCTIONS =========================================================

//View departments table:
function viewDepartments() {
    let query = "SELECT * FROM department;";
    db.query(query, async function (err, res) {
        console.log(chalk.yellow("\nDEPARTMENTS TABLE:"));
        console.table("\n", res);
        menuQuestions();
    });
}

//View Roles table:
function viewRoles() {
    let query = "SELECT * FROM role;";
    db.query(query, function (err, res) {
        console.log(chalk.yellow("\nROLES TABLE:"))
        console.table("\n", res);
        menuQuestions();
    });
}

//View employees table:
function viewEmployees() {
    let query = `SELECT E.id, E.first_name, E.last_name, R.title,  D.department_name, R.salary, EE.last_name AS Manager
    FROM employee E
    INNER JOIN role R ON R.id = E.role_id
    INNER JOIN department D ON D.id = R.department_id
    INNER JOIN employee EE ON EE.id = E.manager_id;`;
    db.query(query, function (err, res) {
        console.log(chalk.yellow("\nEMPLOYEES TABLE:"))
        console.table("\n", res);
        menuQuestions();
    });
}

async function addEmployee() {
    try {

        var roles
        var managers
        try {
            roles = await selectRole();
        } catch (error) {
            console.error(error);
        }


        try {
            managers = await selectManager();
        } catch (error) {
            console.error(error);
        }

        const val = await inquirer.prompt([
            {
                name: "firstname",
                type: "input",
                message: "Enter their first name ",
            },
            {
                name: "lastname",
                type: "input",
                message: "Enter their last name ",
            },
            {
                name: "role",
                type: "list",
                loop: false,
                message: "What is their role? ",
                choices: roles,
            },
            {
                name: "manager",
                type: "list",
                loop: false,
                message: "Whats their managers name?",
                choices: managers,
            },
        ]);


        const roleId = roles.indexOf(val.role) + 1;
        const managerId = managers.indexOf(val.manager) + 1;

        let sql = 'INSERT INTO employee SET ?';

        const values = {
            first_name: val.firstname,
            last_name: val.lastname,
            manager_id: roleId,
            role_id: managerId,
        };

        db.query(sql, values, (error, results, fields) => {
            if (error) throw error;
            console.log('New user added with ID:', results.insertId);
            console.log("New employee inserted into the Table : \n")
            console.table(val);
            menuQuestions();
        });

    } catch (err) {
        console.error(err);
    }
}


async function addRole() {
    try {

        var roles,departments;
        var valueIndex = 0;

        try {
            roles = await selectRole();
        } catch (error) {
            console.error(error);
        }

        try {
            departments = await selectDepartment();
        } catch (error) {
            console.error(error);
        }

        while (valueIndex >= 0) {
            var val = await inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the role title you'd like to add?",
                },
                {
                    type: "number",
                    name: "salary",
                    message: "What is the salary for this role?",
                },
                {
                    type: "list",
                    loop: false,
                    name: "department",
                    message: "What is the department name for the role?",
                    choices: departments,
                },
            ]);
            //Check if the provided value exist in the table it index in the array
            valueIndex = roles.indexOf(val.title.trim());
            if (valueIndex >= 0) {
                console.log(`the Role name: ${val.title.trim()} you provided already exists in the database, try again ..`);
            }
        }


        let departmentId = departments.indexOf(val.department) + 1;
        let sql = 'INSERT INTO role SET ?';
        const values = {
            title: val.title.trim(),
            salary: val.salary,
            department_id: departmentId//autoincrement department_id
        };

        db.query(sql, values, (error, results, fields) => {
            if (error) throw error;
            console.log(`New role with title:  ${val.title.trim()}  was aded to the roles table:\n`);
            console.table(val);
            menuQuestions();
        });

    } catch (err) {
        console.error(err);
    }
}



async function addDepartment() {
    try {
        var departments;

        try {
            departments = await selectDepartment();
        } catch (error) {
            console.error(error);
        }
        var valueIndex = departments.length;
        // console.log("Array length = ", valueIndex);



        while (valueIndex >= 0) {
            var val = await inquirer.prompt([
                {
                    type: "input",
                    name: "department_name",
                    message: "What is the name of the department you'd like to add?",
                },
            ]);
            //Check if the provided value exist in the table it index in the array
            valueIndex = departments.indexOf(val.department_name.trim());
            if (valueIndex >= 0) {
                console.log(`the Department name: ${val.department_name.trim()} you provided already exists in the database, try again ..`);
            }
        }

        let sql = 'INSERT INTO department SET ?';
        const values = {
            department_name: val.department_name.trim(),
        };

        db.query(sql, values, (error, results, fields) => {
            if (error) throw error;
            console.log(`New department added with ID:  ${results.insertId},  was added to the departments table : \n`);
            console.table(val);
            menuQuestions();
        });

    } catch (err) {
        console.error(err);
    }
}


async function updateEmployeeRoles() {

    try {
        var employeeNames, roles;
        try {
            employeeNames = await selectEmployee();
        } catch (error) {
            console.error(error);
        }
        try {
            roles = await selectRole();
        } catch (error) {
            console.error(error);
        }

          var val = await inquirer.prompt([
            {
                type: "list",
                loop: false,
                name: "employee",
                message: "What is the employee name? ",
                choices: employeeNames,
                message: "What is the first name of the employee you want to update?",
            },
            {
                type: "list",
                loop: false,
                name: "role",
                message: "Select new role? ",
                choices: roles,
            },
        ]);

        let employeeIndex=employeeNames.indexOf(val.employee)+1;
        let roleIndex=roles.indexOf(val.role)+1;

        let sql ="UPDATE employee SET role_id = ? WHERE id = ?";

        const values = [roleIndex, employeeIndex];

        db.query(sql, values, (error, results, fields) => {
            if (error) throw error;
            console.log(`New role with title:  ${val.role}  was update for the user ${val.employee}:\n`);
            console.table(val);
            menuQuestions();
        });
    }

    catch (err) {
        console.error(err);
    }
}


