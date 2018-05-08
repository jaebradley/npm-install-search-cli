import {
  NPM_DEPENDENCY_INSTALL_OPTION,
  NPM_DEV_DEPENDENCY_INSTALL_OPTION,
  NPM_OPTIONAL_DEPENDENCY_INSTALL_OPTION,
  NPM_GLOBAL_INSTALL_OPTION,
  NPM_NO_SAVE_OPTION,
  NPM_SAVE_EXACT_OPTION,
  NPM_DRY_RUN_OPTION,
  YARN_DEPENDENCY_ADD_OPTION,
  YARN_DEV_DEPENDENCY_ADD_OPTION,
  YARN_PEER_DEPENDENCY_ADD_OPTION,
  YARN_OPTIONAL_DEPENDENCY_ADD_OPTION,
  YARN_SAVE_EXACT_VERSION,
  YARN_SAVE_MOST_RECENT_MINOR_VERSION,
  DEFAULT_INSTALLER_SAVE_OPTION,
} from './constants';

const buildNpmInstallOptions = ({
  save = false,
  saveProd = false,
  saveDev = false,
  saveOptional = false,
  saveExact = false,
  saveBundle = false,
  noSave = false,
  dryRun = false,
  global = false,
} = {}) => {
  const options = [];

  if (save || saveProd) {
    options.push('-P');
  }

  if (saveDev) {
    options.push('-D');
  }

  if (saveOptional) {
    options.push('-O');
  }

  if (saveExact) {
    options.push('-E');
  }

  if (saveBundle) {
    options.push('-B');
  }

  if (noSave) {
    options.push('--no-save');
  }

  if (dryRun) {
    options.push('--dry-run');
  }

  if (global) {
    options.push('--global');
  }

  return options;
};

const buildYarnAddOptions = ({
  dev = false,
  peer = false,
  optional = false,
  exact = false,
  tilde = false,
} = {}) => {
  const options = [];

  if (dev) {
    options.push('-D');
  }

  if (peer) {
    options.push('-P');
  }

  if (optional) {
    options.push('-O');
  }

  if (exact) {
    options.push('-E');
  }

  if (tilde) {
    options.push('-T');
  }

  return options;
};

const NPM_INSTALL_PROMPT_SELECTION_TO_OPTION = Object.freeze({
  [NPM_DEPENDENCY_INSTALL_OPTION]: { save: true },
  [NPM_DEV_DEPENDENCY_INSTALL_OPTION]: { saveDev: true },
  [NPM_OPTIONAL_DEPENDENCY_INSTALL_OPTION]: { saveOptional: true },
  [NPM_GLOBAL_INSTALL_OPTION]: { global: true },
});

const NPM_SAVE_PROMPT_SELECTION_TO_OPTION = Object.freeze({
  [NPM_NO_SAVE_OPTION]: { noSave: true },
  [NPM_SAVE_EXACT_OPTION]: { saveExact: true },
  [NPM_DRY_RUN_OPTION]: { dryRun: true },
  [DEFAULT_INSTALLER_SAVE_OPTION]: {},
});

const YARN_ADD_PROMPT_SELECTION_TO_OPTION = Object.freeze({
  [YARN_DEPENDENCY_ADD_OPTION]: {},
  [YARN_DEV_DEPENDENCY_ADD_OPTION]: { dev: true },
  [YARN_PEER_DEPENDENCY_ADD_OPTION]: { peer: true },
  [YARN_OPTIONAL_DEPENDENCY_ADD_OPTION]: { optional: true },
});

const YARN_SAVE_PROMPT_SELECTION_TO_OPTION = Object.freeze({
  [YARN_SAVE_EXACT_VERSION]: { exact: true },
  [YARN_SAVE_MOST_RECENT_MINOR_VERSION]: { tilde: true },
  [DEFAULT_INSTALLER_SAVE_OPTION]: {},
});

const buildNpmInstallOptionsFromSelections = ({ installSelection, saveSelection }) => {
  const installOption = NPM_INSTALL_PROMPT_SELECTION_TO_OPTION[installSelection];
  const saveOption = NPM_SAVE_PROMPT_SELECTION_TO_OPTION[saveSelection];

  if (installOption === undefined || saveOption === undefined) {
    throw new Error(`Unable to identify install selection of ${installSelection} or save selection of ${saveSelection}`);
  }

  return Object.assign(installOption, saveOption);
};

const buildYarnAddOptionsFromSelections = ({ installSelection, saveSelection }) => {
  const installOption = YARN_ADD_PROMPT_SELECTION_TO_OPTION[installSelection];
  const saveOption = YARN_SAVE_PROMPT_SELECTION_TO_OPTION[saveSelection];

  if (installOption === undefined || saveOption === undefined) {
    throw new Error(`Unable to identify install selection of ${installSelection} or save selection of ${saveSelection}`);
  }

  return Object.assign(installOption, saveOption);
};

export {
  buildNpmInstallOptions,
  buildYarnAddOptions,
  buildNpmInstallOptionsFromSelections,
  buildYarnAddOptionsFromSelections,
};
