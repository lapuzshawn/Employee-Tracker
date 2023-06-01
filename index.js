const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

/*
TODO: 
// : view all departments, 
// : view all roles, view all employees, 
// : add a department, add a role, add an employee, 
    and update an employee role

*/

/*
TDONE: 
// : view all departments, 
// : view all roles, view all employees, 
// : add a department, add a role, add an employee, 
    and update an employee role

*/

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  loadPrompt();
}

function loadPrompt() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add an Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE"
        },
        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Update an Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    // Call the appropriate function depending on what the user chose
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "QUIT":
        quit();
        break;
    }
  });
}

// View all employees
function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadPrompt());
}

// View all roles
function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => loadPrompt());
}

// View all departments
function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadPrompt());
}

// Add an employee
function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "Enter the employee's first name:"
    },
    {
      name: "last_name",
      message: "Enter the employee's last name:"
    },
    {
      name: "role_id",
      message: "Enter the employee's role ID:"
    },
    {
      name: "manager_id",
      message: "Enter the employee's manager ID (optional):"
    }
  ])
    .then(employee => {
      db.createEmployee(employee);
      console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database`
      )
    })
    .then(() => loadPrompt());;
}

// Add a role
function addRole() {
  prompt([
    {
      name: "title",
      message: "Enter the role title:"
    },
    {
      name: "salary",
      message: "Enter the role salary:"
    },
    {
      name: "department_id",
      message: "Enter the department ID:"
    }
  ])
    .then(role => {
      db.createRole(role);
    })
    .then(() => {
      console.log("Role added successfully!");
      loadPrompt();
    });
}

// Add a department
function addDepartment() {
  prompt([
    {
      name: "name",
      message: "Enter the department name:"
    }
  ])
    .then(department => {
      db.createDepartment(department);
    })
    .then(() => {
      console.log("Department added successfully!");
      loadPrompt();
    });
}

// Update an employee's role
function updateEmployeeRole() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }));

      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select the employee to update:",
          choices: employeeChoices
        },
        {
          name: "roleId",
          message: "Enter the new role ID:"
        }
      ])
        .then(data => {
          const { employeeId, roleId } = data;
          db.updateEmployeeRole(employeeId, roleId);
          console.log("Employee role updated successfully!");
        })
        .then(() => loadPrompt());
    });
}

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
