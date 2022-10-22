const inquirer = require("inquirer");
const fs = require("fs");

function writeToFile(fileName, data) {
    fs.writeFile(fileName + ".md", data, (err) => {
        if (err) {
            console.log("Error")
        } else {
            console.log("Success!")
        }
    })
}

// Questions for the user to answer to generate the README File
function init() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of this project? ",
            name: "title"
        },
        {
            type: "input",
            message: "Describe your project.",
            name: "description"
        },
        {
            type: "input",
            message: "What are the installation instructions?",
            name: "instructions"
        },
        {
            type: "input",
            message: "What is the program's usage?",
            name: "usage",
        },
        {
            type: "list",
            message: "What is the license for this project?",
            choices: ["MIT", "Apache 2.0", "GPL 3.0", "Unlicensed", "Other"],
            default: "Unlicensed",
            name: "license"
        },
        {
            type: "input",
            message: "Who contributed to the project? ",
            name: "contribute"
        },
        {
            type: "input",
            message: "What tests were used for your project? ",
            name: "test"
        },
        {
            type: "input",
            message: "What is your GitHub username? ",
            name: "github"
        },
        {
            type: "input",
            message: "What is your email for contact?",
            name: "email"
        }
]).then((response) => {
    let badgeURL;
    let licenseURL;
    switch (response.projLicen) {
        case "MIT":
            badgeURL = "https://img.shields.io/badge/License-MIT-red"
            licenseURL = "https://opensource.org/licenses/MIT"
            break;
        case "Apache 2.0":
            badgeURL = "https://img.shields.io/badge/License-Apache%202.0-red"
            licenseURL = "https://opensource.org/licenses/Apache-2.0"
            break;
        case "GPL 3.0":
            badgeURL = "https://img.shields.io/badge/License-GPL%203.0-red"
            licenseURL = "https://opensource.org/licenses/GPL-3.0"
            break;
        case "Unlicensesd":
            badgeURL = "https://img.shields.io/badge/-Unlicensed-red"
            licenseURL = "https://opensource.org/licenses"
            break;
        case "Other":
            badgeURL = "https://img.shields.io/badge/-See%20License%20Section-red"
            licenseURL = "https://opensource.org/licenses"
            break;
    }

    writeToFile("README-" + response.title,
// The whole string of the README file gets printed and takes the response from the user
`
# ${response.title}
![license badge](${badgeURL})
## Description
    
${response.description}
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license) 
- [Contributions](#contributions) 
- [Tests](#tests) 
- [Questions](#questions) 
## Installation
    
${response.instructions}
## Usage
    
${response.usage}
## License
This program is covered under the [${response.license}](${licenseURL}) license.
    
## Contributions
    
${response.contribute}
## Tests
${response.test}
## Questions
You can also message me on GitHub at [${response.github}](https://github.com/${response.github}) or via email at ${response.email}
`

);});}

// Function call to initialize app
init();
