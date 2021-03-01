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

//Initial question

let generalAnsw = [];
const questions = [
  {
    type: "list",
    message: "What kind of employee member would you like to create?",
    choices: ["Manager", "Engineer", "Intern"],
    name: "employee",
  },
];
// question to add another member
const anotherEmp = [
  {
    type: "confirm",
    message: "Do you want to add another employee?",
    name: "addEmployee",
  },
];
//question for manager
const managerQ = [
  {
    type: "input",
    message: "what is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "what is your id?",
    name: "id",
  },
  {
    type: "input",
    message: "what is your email?",
    name: "email",
  },
  {
    type: "input",
    message: "what is your office Number?",
    name: "officeNumber",
  },
];
//questions for engineer
const engineerQ = [
  {
    type: "input",
    message: "what is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "what is your id?",
    name: "id",
  },
  {
    type: "input",
    message: "what is your email?",
    name: "email",
  },

  {
    type: "input",
    message: "what is your github username?",
    name: "github",
  },
];
// questions for intern
const internQ = [
  {
    type: "input",
    message: "what is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "what is your id?",
    name: "id",
  },
  {
    type: "input",
    message: "what is your email?",
    name: "email",
  },

  {
    type: "input",
    message: "what is your school name?",
    name: "school",
  },
];
// if the user chooses one of the options, then i want to present the questions corresponding to the option.

// questions saved to variable oneQ to call this function in other sections
const oneQ = () => {
  inquirer.prompt(questions).then((responses) => {
    if (responses.employee === "Manager") {
      createManager();
    } else if (responses.employee === "Engineer") {
      createEngineer();
    } else {
      createIntern();
    }
  });
};

const addingMember = () => {
  inquirer.prompt(anotherEmp).then((responses) => {
    if (responses.addEmployee === true) {
      oneQ(); //after user finishes adding any member, this function allows to add another member
    } else {
      renderEl();
    }
  });
};
// function to prompt the user with the corresponding questions
const createManager = () => {
  inquirer.prompt(managerQ).then((responses) => {
    generalAnsw.push(
      new Manager(
        responses.name,
        responses.id,
        responses.email,
        responses.officeNumber
      )
    );
    console.log(generalAnsw);
    addingMember();
  });
};
const createEngineer = () => {
  inquirer.prompt(engineerQ).then((responses) => {
    generalAnsw.push(
      new Engineer(
        responses.name,
        responses.id,
        responses.email,
        responses.github
      )
    );
    console.log(generalAnsw);
    addingMember();
  });
};

const createIntern = () => {
  inquirer.prompt(internQ).then((responses) => {
    generalAnsw.push(
      new Intern(
        responses.name,
        responses.id,
        responses.email,
        responses.school
      )
    );
    console.log(generalAnsw);
    addingMember();
  });
};
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
const renderEl = () =>{
    fs.writeFile(outputPath, render(generalAnsw), (err) => {
        (err) ? console.error(err): console.log ('success');

      });
     
}


oneQ();


