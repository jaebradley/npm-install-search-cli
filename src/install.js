import { spawn } from 'child_process';

const install = ({ name, version, options }) => (
  spawn(
    'npm',
    [
      'install',
      `${name}@${version}`,
      ...options,
    ],
    { stdio: 'inherit' },
  )
);

export default install;
