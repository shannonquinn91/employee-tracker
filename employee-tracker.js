var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "bootcamp",
  database: "employee_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  questionUser();
});

function questionUser () {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View all employees", 
            "View all employees by department",
            "View all employees by role",
            "Add a new employee",
            "Update employee role",
            "Update employee manager"
        ]
    }]).then((response) => {
        if (response.action === "View all employees") {
            viewEmployees();
        } else if (response.action === "View all employees by department") {
            viewByDepartment();
        } else if (response.action === "View all employees by role") {
            viewByRoles();
        } else if (response.action === "Add a new employee") {
            addNewEmployee();
        } else if (response.action === "Update employee role") {
            updateRole();
        } else if (response.action === "Update employee manager") {
            //run function to update an employee entry
        }
    })
}

//Query Functions Below
//============================================================================

//Function to allow user to view employees
function viewEmployees () {
    console.log("Viewing all employees");
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    })
}

//Function to allow user to view employees by department
function viewByDepartment () {};

//Function to allow user to view employees by roles
function viewByRoles () {};

//Function to allow user to add employees
function addNewEmployee () {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the new employees first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the new employees last name?"
        },
        {
            name: "role_id",
            type: "list",
            message: "What is the new employees role id?",
            choices: [101, 102, 103, 104]
        },
        {
            name: "manager_id",
            type: "list",
            message: "What is the new employees manager id?",
            choices: [001, 002, 003, 004]
        }
    ]).then((response) => {
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: response.first_name,
            last_name: response.last_name,
            role_id: response.role_id,
            manager_id: response.manager_id
        }, function (err) {
            if (err) throw err;
            console.log("New employee added successfully")
            questionUser();
        })
    })
};
//Function to allow user to update an employees role
function updateRole () {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "choose",
                type: "rawlist",
                choices: function () {
                    var employeeArray = [];
                    for (var i = 0; i < results.length; i++) {
                        employeeArray.push(results[i].first_name + " " + results[i].last_name);
                    }
                    return employeeArray;
                },
                message: "Which employee would you like to update?"
            }
        ]).then((response) => {
            console.log(response);
        })
            
    })
   
}
//BONUS: view employees by manager
//BONUS: view total utilized budget (combined salaries of employees in that dept)//Function to allow user to add departments
//BONUS: update employee managers
//BONUS: Delete departments, roles, employees