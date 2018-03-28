import { spawn } from 'child_process';

const install = ({ packages, options }) => (
  spawn(
    'npm',
    [
      'install',
      ...packages.map(({ name, version }) => `${name}@${version}`),
      ...options,
    ],
    { stdio: 'inherit' },
  )
);

export default install;
