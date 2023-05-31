const connection = require("./connection");

/*
// : view all departments, 
// : view all roles, view all employees, 
// : add a department, add a role, add an employee, 
    and update an employee role

*/

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    const sql = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
    `;
    return this.connection.promise().query(sql);
  }

  // Create a new employee
  createEmployee(employee) {
    const sql = "INSERT INTO employee SET ?";
    return this.connection.promise().query(sql, employee);
  }

  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    const sql = "UPDATE employee SET role_id = ? WHERE id = ?";
    return this.connection.promise().query(sql, [roleId, employeeId]);
  }

  // Find all roles, join with departments to display the department name
  findAllRoles() {
    const sql = `
      SELECT role.id, role.title, department.name AS department, role.salary
      FROM role
      LEFT JOIN department ON role.department_id = department.id
    `;
    return this.connection.promise().query(sql);
  }

  // Create a new role
  createRole(role) {
    const sql = "INSERT INTO role SET ?";
    return this.connection.promise().query(sql, role);
  }

  // Find all departments
  findAllDepartments() {
    const sql = "SELECT * FROM department";
    return this.connection.promise().query(sql);
  }

  // Create a new department
  createDepartment(department) {
    const sql = "INSERT INTO department SET ?";
    return this.connection.promise().query(sql, department);
  }
}

module.exports = new DB(connection);
