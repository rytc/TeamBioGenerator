const Employee = require('./Employee.js')

class Engineer extends Employee {
    constructor(name, employeeId, email, github) {
        super(name, employeeId, email)
        this.github = github;
    }

    getRole() {
        return "Engineer";
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer