#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';
import execute from '..';
import { yarnAdd } from '../install';
import { buildYarnAddOptions } from '../buildInstallOptions';

program.version(pkg.version)
  .description('CLI that combines searching and adding packages from the npm registry for yarn')
  // options defined in https://yarnpkg.com/en/docs/cli/add
  .option('-D, --dev', 'Save to devDependencies')
  .option('-P, --peer', 'Save to peerDependencies')
  .option('-O, --optional', 'Save optional')
  .option('-E, --exact', 'Save exact version')
  .option('-T, --tilde', 'Save most recent minor version')
  .parse(process.argv);


execute({ options: program, install: yarnAdd, optionsBuilder: buildYarnAddOptions });
