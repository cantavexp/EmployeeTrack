const connection = require("./connection");



class DB{
    constructor(connection) {
        this.connection = connection;
    }
    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT * FROM department;"
        );
    }

    findAllRoles() {
        return this.connection.promise().query(
            "SELECT * FROM roles;"
        );
    }

    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT * FROM employee_name;"
        );
    }

    addDepartment(department) {
        return this.connection.promise().query(
            "INSERT INTO department SET ?", department
        );
    }
    

    addRole(role) {
        console.log(role);
        return this.connection.promise().query(
            "INSERT INTO roles SET ?", role
        );
    }
    addEmployees(employee_name) {
        console.log(employee_name);
        return this.connection.promise().query(
            "INSERT INTO employee_name SET ?", employee_name
        );
    }

    updateEmployeeRole(employee_id, role_id) {
        return this.connection.promise().query(
            "UPDATE title SET department_id = ? WHERE id = ?", [role_id, employee_id]
        );
    }

    quit() {
        console.log("Goodbye!");
        process.exit();
    }


    addEmployee(employee_name) {
        return this.connection.promise().query("INSERT INTO employee_name ?", employee_name);
    }
    
    

}

module.exports = new DB(connection);