#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';
import execute from '../';

program.version(pkg.version)
  .description('CLI that combines searching and installing npm packages')
  // all options defined in https://docs.npmjs.com/cli/install
  .option('-S, --save', 'Save to dependencies')
  .option('-P, --save-prod', 'Save to dependencies')
  .option('-D, --save-dev', 'Save to devDependencies')
  .option('-O, --save-optional', 'Save optional')
  .option('-E, --save-exact', 'Save exact version')
  .option('-B, --save-bundle', 'Save bundle')
  .option('--no-save', 'Do not save')
  .option('--dry-run', 'Dry run')
  .parse(process.argv);


execute(program);

