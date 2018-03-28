import inquirer from 'inquirer';

const selectAnotherPackage = async () => (
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'searchAgain',
      message: 'Search again?',
      default: false,
    },
  ])
);

export default selectAnotherPackage;
