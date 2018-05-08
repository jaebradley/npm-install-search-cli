import PackageSearchPrompter from './PackageSearchPrompter';
import { DONE_SEARCHING, INSTALLER } from './constants';
import { npmInstall, yarnAdd } from './install';
import {
  buildNpmInstallOptions,
  buildYarnAddOptions,
  buildNpmInstallOptionsFromSelections,
  buildYarnAddOptionsFromSelections,
} from './buildInstallOptions';
import promptInstallOptions from './promptInstallOptions';

const execute = async ({ options, installer }) => {
  let installOptions = options;
  const isYarn = installer === INSTALLER.YARN;
  const install = isYarn ? yarnAdd : npmInstall;
  const installOptionsBuilder = isYarn ? buildYarnAddOptions : buildNpmInstallOptions;

  if (options.rawArgs.length <= 2) {
    const {
      installOption,
      saveOption,
    } = await promptInstallOptions(installer);
    const installOptionsBuilderFromSelections = isYarn
      ? buildYarnAddOptionsFromSelections : buildNpmInstallOptionsFromSelections;
    installOptions = installOptionsBuilderFromSelections({
      installSelection: installOption,
      saveSelection: saveOption,
    });
  }

  try {
    const packages = [];
    const packageSearchPrompter = new PackageSearchPrompter();
    let packageDetails = await packageSearchPrompter.prompt();

    while (packageDetails !== DONE_SEARCHING) {
      packages.push(packageDetails);
      // eslint-disable-next-line no-await-in-loop
      packageDetails = await packageSearchPrompter.prompt();
    }

    if (packages.length > 0) {
      install({ packages, options: installOptionsBuilder(installOptions) });
    }
  } catch (error) {
    console.error('😞  Rut ro, an error occurred');
    console.error(error);
  }
};

export default execute;

