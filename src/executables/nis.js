#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';
import execute from '../';
import { npmInstall } from '../install';
import { buildNpmInstallOptions } from '../buildInstallOptions';

program.version(pkg.version)
  .description('CLI that combines searching and installing packages form the npm registry for npm')
  // options defined in https://docs.npmjs.com/cli/install
  .option('-S, --save', 'Save to dependencies')
  .option('-P, --save-prod', 'Save to dependencies')
  .option('-D, --save-dev', 'Save to devDependencies')
  .option('-O, --save-optional', 'Save optional')
  .option('-E, --save-exact', 'Save exact version')
  .option('-B, --save-bundle', 'Save bundle')
  .option('-g, --global', 'Install globally')
  .option('--no-save', 'Do not save')
  .option('--dry-run', 'Dry run')
  .parse(process.argv);


execute({ options: program, install: npmInstall, installOptionsBuilder: buildNpmInstallOptions });

