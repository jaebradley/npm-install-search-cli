import PackageSearchPrompter from './PackageSearchPrompter';
import { DONE_SEARCHING } from './constants';

const execute = async ({ options, install, installOptionsBuilder }) => {
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
      install({ packages, options: installOptionsBuilder(options) });
    }
  } catch (error) {
    console.error('😞  Rut ro, an error occurred');
    console.error(error);
  }
};

export default execute;

