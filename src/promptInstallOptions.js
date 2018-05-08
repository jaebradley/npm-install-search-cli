import inquirer from 'inquirer';

import {
  YARN,
  NPM_INSTALL_OPTIONS,
  NPM_SAVE_OPTIONS,
  YARN_ADD_OPTIONS,
  YARN_SAVE_OPTIONS,
} from './constants';

const promptInstallOptions = async (installer) => {
  const installOptions = installer === YARN ? YARN_ADD_OPTIONS : NPM_INSTALL_OPTIONS;
  const saveOptions = installer === YARN ? YARN_SAVE_OPTIONS : NPM_SAVE_OPTIONS;

  return inquirer.prompt([
    {
      type: 'list',
      name: 'installOption',
      message: 'Select install type',
      choices: installOptions,
    },
    {
      type: 'list',
      name: 'saveOption',
      message: 'Select save type',
      choices: saveOptions,
    },
  ]);
};

export default promptInstallOptions;
