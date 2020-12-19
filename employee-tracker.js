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
            "View all employees by role",
            "Add a new employee",
            "Add a new department",
            "Add a new role",
            "Update employee role",
            "Update employee manager",
            "Exit Employee Tracker"
        ]
    }]).then((response) => {
        if (response.action === "View all employees") {
            viewEmployees();
        } else if (response.action === "View all employees by role") {
            viewByRoles();
        } else if (response.action === "Add a new employee") {
            addNewEmployee();
        } else if (response.action === "Add a new department") {
            addNewDept();
        } else if (response.action === "Add a new role") {
            addNewRole();
        } else if (response.action === "Update employee role") {
            updateRole();
        } else if (response.action === "Update employee manager") {
            updateManager();
        } else if (response.action === "Exit Employee Tracker") {
            connection.end();
        }

    })
}

//Functions
//============================================================================

//Function to allow user to view employees
function viewEmployees () {
    console.log("Viewing all employees");
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        questionUser();
    })
}

//Function to allow user to view employees by roles
function viewByRoles () {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "roleTitle",
                type: "list",
                message: "Which role would you like to view?",
                choices: function() {
                    let rolesArray = []
                    for (let i = 0; i < res.length; i++) {
                        rolesArray.push(res[i].title);
                    }
                    return rolesArray;
                }
            }
        ]).then ((response) => {
            let roleToView = response.roleTitle;
            connection.query(
                `SELECT employee.*, role.id, role.title FROM employee INNER JOIN role WHERE role.id = employee.role_id and role.title = "${roleToView}"`, 
                function(err, res) {
                    if (err) throw err;
                    console.table(res);
                    questionUser();
                }
                )
            })
        })
};
    
//Function to allow user to add employees
function addNewEmployee () {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        let deptArray = [];
        let deptIDArray = [];
        for (let i = 0; i < res.length; i++) {
            deptArray.push(res[i].name);
            deptIDArray.push(res[i].id);
        }
        //console.log(deptIDArray);
        connection.query("SELECT * FROM role", function(err, res) {
            if (err) throw err;
            let roleArray = [];
            let roleIDArray = [];
            for (let i = 0; i < res.length; i++) {
                roleArray.push(res[i].title);
                roleIDArray.push(res[i].id);
            }
            //console.log(roleIDArray);
            //console.log(roleArray);
            inquirer.prompt([
                {
                    name: "newFirstName",
                    type: "input",
                    message: "What is the new employees first name?"
                },
                {
                    name: "newLastName",
                    type: "input",
                    message: "What is the new employees last name?"
                },
                {
                    name: "newRole",
                    type: "list",
                    message: "What is the new employees role?",
                    choices: roleArray
                }
            ]).then((responses) => {
                //console.log(responses);
                const newFirstName = responses.newFirstName;
                const newLastName = responses.newLastName;
                const newRoleTitle = responses.newRole;
                const newManager = responses.newManager;
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: newFirstName,
                        last_name: newLastName
                    },
                    function(err) {
                        if (err) throw err;
                        connection.query(
                            `SELECT * FROM role WHERE title = "${newRoleTitle}"`,
                            function(err, res) {
                                if (err) throw err;
                                console.log(res);
                                const newRoleID = res[0].id;
                                connection.query(
                                    `UPDATE employee SET role_id = ${newRoleID} WHERE first_name = "${newFirstName}" and last_name = "${newLastName}"`,
                                    function(err) {
                                        if (err) throw err;
                                        console.log(`You have successfully added ${newFirstName} ${newLastName} as a new ${newRoleTitle}. By default, the new employee has no manager. Please select "Update employee manager" to update this information.`);
                                        questionUser();
                                    }
                                )
                            }
                        )
                    }
                )
            }) 
        })
    })
};


//Function to allow user to update an employees role
function updateRole () {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        //Used reduce method to restructure data for better user function
        const employeesList = results.reduce((accumulator, element) => {
            var firstName = element.first_name;
            var lastName = element.last_name;
            var id = element.id;
            var roleID = element.role_id;
            var managerID = element.manager_id;
            var fullName = `${firstName} ${lastName}`; 
            accumulator[fullName] = {
                id,
                firstName,
                lastName,
                roleID,
                managerID
            }
            accumulator.choices.push(fullName);
            return accumulator;
        }, { choices: [] });
        inquirer.prompt([
            {
                name: "update",
                type: "rawlist",
                choices: employeesList.choices,
                message: "Which employee would you like to update?"
            }
        ]).then((response) => {
            let employeeToUpdate = response.update;
            console.log(employeesList[employeeToUpdate]);
            let employeeCurrentRole = employeesList[employeeToUpdate].roleID;
            let employeeToUpdateID = employeesList[employeeToUpdate].id;
            console.log(`The current role for ${employeeToUpdate} is ${employeeCurrentRole}`);
            
            connection.query("SELECT * FROM role", function(err, res) {
                if (err) throw err;
                const roleList = res.reduce((accumulator, element) => {
                    var roleNum = element.id;
                    var roleTitle = element.title;
                    accumulator[roleTitle] = {
                        roleNum,
                        roleTitle
                    }
                    accumulator.roles.push(roleTitle);
                    return accumulator;
                }, {roles: []});

                inquirer.prompt([
                    {
                        name: "newRole",
                        type: "rawlist",
                        choices: roleList.roles,
                        message: `What is ${employeeToUpdate}'s new role?`
                    }
                ]).then((response) => {
                    //console.log(response.newRole)
                    connection.query(`SELECT * FROM role WHERE title = "${response.newRole}"`, function (err, res) {
                        if (err) throw err;
                        //console.log(res[0].id);
                        let newRoleID = res[0].id;
                        let newRoleTitle = res[0].title;
                        connection.query(`
                        SELECT role.id, role.title, employee.role_id, employee.id, employee.first_name, employee.last_name
                        FROM role
                        INNER JOIN employee ON role.id = employee.role_id
                        WHERE employee.id = ${employeeToUpdateID}`,
                        function (err, res) {
                            if (err) throw err;
                            //console.table(res);
                            connection.query(`UPDATE employee SET ? WHERE id = ${employeeToUpdateID}`, 
                            [
                                {
                                    role_id: newRoleID
                                }
                            ],
                            function(err) {
                                if (err) throw err;
                                console.log(`${employeeToUpdate}'s role has been changed to ${newRoleTitle}`)
                                console.log()
                                questionUser();
                            })
                        })
                    })
                })
            }) 
        })
    })         
}

//Funciton to add a new department
function addNewDept() {
    inquirer.prompt([
        {
            name: "newDept",
            type: "input",
            message: "What is the name of the department you would like to add?"
        }
    ]).then((response) => {
        let newDeptName = response.newDept;
        connection.query(
            `INSERT INTO department(name) VALUES(${newDeptName})`, function(err) {
                if (err) throw (err);
                console.log(`You have successfully added ${newDeptName}.`)
            }
        )
    })
}

//Function to add a new role
function addNewRole() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "newTitle",
                type: "input",
                message: "What is the title for the new role?"
            },
            {
                name: "newSalary",
                type: "input",
                message: "What is the salary for the new role?"
            },
            {
                name: "newDept",
                type: "list",
                message: "What department does this role belong in?",
                choices: function() {
                    let deptArray = [];
                    for (let i = 0; i < res.length; i++) {
                        deptArray.push(res[i].name)
                    }
                    return deptArray;
                }
            }
        ]).then ((response) => {
            //console.log(response);
            let newRoleTitle = response.newTitle;
            let newRoleSalary = response.newSalary;
            let newRoleDept = response.newDept;
            connection.query(
                `SELECT * FROM department WHERE name = "${newRoleDept}"`,
                function(err, res) {
                    if (err) throw err;
                    let newRoleDeptID = res[0].id;
                    connection.query(
                        `INSERT INTO role (title, salary, department_id) VALUES ("${newRoleTitle}", "${newRoleSalary}", ${newRoleDeptID})`, 
                        function(err) {
                            if (err) throw err;
                            console.log(`The role ${newRoleTitle} has been added.`)
                            questionUser();
                        }
                    )
                }
            )
        })
    })
    
}

//Function to update the manager of an employee
//Function not working as expected
function updateManager () {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        inquirer.prompt([
            {
                name: "employeeToUpdateID",
                type: "input",
                message: "See table above. What is the ID of the EMPLOYEE YOU NEED TO UPDATE?"

            },
            {
                name: "newManagerID",
                type: "input",
                message: "See table above. What is the ID of the NEW MANAGER you want to assign to this employee?"
            }
        ]).then((response) => {
            let employeeToUpdateID = response.employeeToUpdateID;
            let newManagerID = response.newManagerID;
            connection.query(
                `UPDATE employee SET manager_id = ${newManagerID} WHERE id = ${employeeToUpdateID}`,
                function(err) {
                    if (err) throw err;
                    console.log("You have successfully updated the manager for the selected employee.")
                    questionUser();
                }
            )
        })
    })
}
//BONUS: view employees by manager
//BONUS: view total utilized budget (combined salaries of employees in that dept)
//BONUS: update employee managers
//BONUS: Delete departments, roles, employees
