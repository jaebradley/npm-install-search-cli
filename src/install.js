import { spawn } from 'child-process-promise';

const install = ({
  packages,
  options,
  packageManager,
  command,
}) => (
  spawn(
    packageManager,
    [
      command,
      ...packages.map(({ name, version }) => `${name}@${version}`),
      ...options,
    ],
    { stdio: 'inherit' },
  )
);

const npmInstall = ({ packages, options }) => install({
  packages,
  options,
  packageManager: 'npm',
  command: 'install',
});

const yarnAdd = ({ packages, options }) => install({
  packages,
  options,
  packageManager: 'yarn',
  command: 'add',
});

export {
  npmInstall,
  yarnAdd,
};
