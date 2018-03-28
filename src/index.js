import PackageSearchPrompter from './PackageSearchPrompter';
import selectAnotherPackage from './selectAnotherPackage';
import install from './install';
import buildInstallOptions from './buildInstallOptions';

const execute = async (inputs) => {
  try {
    const packages = [];
    const packageSearchPrompter = new PackageSearchPrompter();
    packages.push(await packageSearchPrompter.prompt());

    let { searchAgain } = await selectAnotherPackage();
    while (searchAgain) {
      packages.push(await packageSearchPrompter.prompt()); // eslint-disable-line no-await-in-loop

      // eslint-disable-next-line no-await-in-loop
      const searchAgainResult = await selectAnotherPackage();
      searchAgain = searchAgainResult.searchAgain; // eslint-disable-line prefer-destructuring
    }

    install({ packages, options: buildInstallOptions(inputs) });
  } catch (error) {
    console.error('😞  Rut ro, an error occurred');
    console.error(error);
  }
};

export default execute;

