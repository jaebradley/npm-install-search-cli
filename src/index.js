import PackageSearchPrompter from './PackageSearchPrompter';
import install from './install';
import buildInstallOptions from './buildInstallOptions';

const execute = async (inputs) => {
  try {
    const packageSearchPrompter = new PackageSearchPrompter();
    const { name, version } = await packageSearchPrompter.prompt();
    install({ options: buildInstallOptions(inputs), name, version });
  } catch (error) {
    console.error('😞  Rut ro, an error occurred');
    console.error(error);
  }
};

export default execute;

