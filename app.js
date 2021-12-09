const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

let employeeList = []
let newEmployeeData = {}

const engineerQuestions = [
    {
        type: "input",
        name: "github",
        message: "GitHub Username: "
    }
];

const internQuestions = [
    {
        type: "input",
        name: "school",
        message: "Intern's School: "
    }
];

const managerQuestions = [
    {
        type: "input",
        name: "officeNumber",
        message: "Manager's Office Number: "
    }
]

const questions = [
    {
        type: "input",
        name: "name",
        message: "Employee Name: "
    },
    {
        type: "input",
        name: "id",
        message: "Employee Id: "
    },
    {
        type: "input",
        name: "email",
        message: "Employee Email: "
    },
    {
        type: "list",
        name: "role",
        message: "Employee Role:",
        choices: ["Engineer", "Intern", "Manager"],
    }

];

function makeEmployee() {
    switch(newEmployeeData.role) {
        case "Engineer": {
            let newEmployee = new Engineer(newEmployeeData.name, newEmployeeData.id, newEmployeeData.employeeList, newEmployeeData.github);
            employeeList.push(newEmployee);
        } break;
        case "Intern": {
            let newEmployee = new Intern(newEmployeeData.name, newEmployeeData.id, newEmployeeData.employeeList, newEmployeeData.school);
            employeeList.push(newEmployee);
        } break;
        case "Manager": {
            let newEmployee = new Manager(newEmployeeData.name, newEmployeeData.id, newEmployeeData.employeeList, newEmployeeData.officeNumber);
            employeeList.push(newEmployee);
        }
    }

    inquirer.prompt([{
        type: "list",
        name: "more",
        message: "Would you like to add another employee?",
        choices: ["Yes", "No"]
    }]).then(answers => {
        if(answers.more === "Yes") {
            addEmployee();
        } else {
            console.log("Rendering to bio.html");
            fs.writeFile("bio.html", render(employeeList), err => {
                if(err) console.log("Failed to write to bio.html: " + err);
            });
        }
    })
}

function addEmployee() {
    inquirer.prompt(questions).then(answers => {
        newEmployeeData = answers;

        switch(answers.role) {
            case "Engineer": {
                inquirer.prompt(engineerQuestions).then(answers => {
                    newEmployeeData.github = answers.github;
                    makeEmployee();
                });
            } break;
            case "Intern": {
                inquirer.prompt(internQuestions).then(answers => {
                    newEmployeeData.school = answers.school;
                    makeEmployee();
                });
            } break;
            case "Manager": {
                inquirer.prompt(managerQuestions).then(answers => {
                    newEmployeeData.officeNumber = answers.officeNumber;
                    makeEmployee();
                });
            }break
        }
    })
}

addEmployee();