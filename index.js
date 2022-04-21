const fs = require("fs");
const inquirer = require('inquirer');
const githubApi = 'https://api.github.com/licenses/';

const techUsed = ["HTML", "CSS", "Javascript", "Node.js", "VS Code", "Sublime", "Git/Github", "Chrome Developer Tools"];

inquirer
    .prompt([
        {
            name: 'username',
            type: 'input',
            message: 'Please enter GitHub username:',
        },
        {
            name: 'email',
            type: 'input',
            message: 'Please enter email address:',
        },
        {
            name: 'title',
            type: 'input',
            message: 'Please enter a title:',
        },
        {
            name: 'description',
            type: 'input',
            message: 'Please enter a description:',
        },

        {
            name: 'install',
            type: 'input',
            message: 'Please enter installation instructions:',
        },
        {
            name: 'usage',
            type: 'input',
            message: 'Please enter usage information:',
        },
        {
            name: 'techologies',
            type: 'checkbox',
            message: 'Please enter technologies used:',
            choices: techUsed,
        },
        {
            name: 'demoGif',
            type: 'input',
            message: 'Please enter the directory of the demo gif relative to index.js:',
        },
        {
            name: 'test',
            type: 'input',
            message: 'Please enter test instructions:',
        },
        {
            name: 'license',
            type: 'input',
            message: 'Please select which license you would like to use (Use arrows + enter to select):',
            // choices: licenses,
        },
        {
            name: 'deployWeb',
            type: 'input',
            message: "Please enter the deployed website's URL:",
        },
        {
            name: 'deployRepo',
            type: 'input',
            message: "Please enter the repository's URL",
        },
        {
            name: 'credits',
            type: 'input',
            message: 'Please enter people to credit followed by their URL:',
        },
    ])
    .then((response) => {
        console.log(response);
        let licenseBody = "";
        let licenseDesc = "";

        fetch(githubApi + response.license)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                console.log("data", data);
                licenseBody = data.body;
                licenseDesc = data.description
            });

        fs.writeFile(`${response.title}.md`, `# ${response.title}
<br><br>

## <ins> Table of Contents: </ins>

- [Questions](#-questions-)
- [Description](#-description-)
- [Installation](#-installation-)
- [Usage](#-usage-)
- [Technologies and Programs Used](#-technologies-and-programs-used-)
- [Demonstration](#-demonstration-)
- [Links](#-links-)
- [Credits](#-credits-)
- [License](#-license-)
<br><br>  

## <ins> Questions? </ins>

### By [${response.username}](https://github.com/${response.username})
### Email: ${response.email}
<br><br>

## <ins> Description: </ins>
        
${response.description}
<br><br>      

## <ins> Installation: </ins>
        
${response.install}
<br><br>

## <ins> Usage: </ins>
        
${response.usage}
<br><br>    

## <ins> Technologies and Programs Used: </ins>
        
${response.technologies}
<br><br> 
        
## <ins> Demonstration: </ins>
        
![Demonstration](${response.demoGif})
<br><br>   

## <ins> Links: </ins>
        
- [Github Deployed Website](${response.deployWeb})
- [Github Repository](${response.deployRepo})
<br><br>     

## <ins> Credits: </ins>

Special Thanks to: 
${response.credits}
<br><br>

## <ins> License: </ins>
        
Copyright (c) 2022 ${response.username}
<br><br>
${licenseBody}
${licenseDesc}
`, (err) =>
            err ? console.error(err) : console.log("Created README!")

        );
    });