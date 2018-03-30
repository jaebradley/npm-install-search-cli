const buildNpmInstallOptions = ({
  save,
  saveProd,
  saveDev,
  saveOptional,
  saveExact,
  saveBundle,
  noSave,
  dryRun,
  installGlobally,
}) => {
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

  if (installGlobally) {
    options.push('--global');
  }

  return options;
};

const buildYarnAddOptions = ({
  dev,
  peer,
  optional,
  exact,
  tilde,
}) => {
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

export {
  buildNpmInstallOptions,
  buildYarnAddOptions,
};
