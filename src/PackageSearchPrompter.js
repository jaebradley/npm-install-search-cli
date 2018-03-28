import inquirer from 'inquirer';
import InquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';

import formatPackageDetails from './formatPackageDetails';
import packageSearcher from './packageSearcher';

inquirer.registerPrompt('autocomplete', InquirerAutocompletePrompt);

class PackageSearchPrompter {
  constructor() {
    // goddamn hacky memoization
    this.packageDetailsMapping = {};
  }

  async prompt() {
    const { npmPackage } = await inquirer.prompt([
      {
        type: 'autocomplete',
        name: 'npmPackage',
        message: 'Search for npm package',
        source: async (answersSoFar, searchTerm) => {
          const packageResults = await packageSearcher({ term: searchTerm || '' });

          const formattedPackageDetails = [];
          const packageDetailsMapping = {};

          packageResults.data.objects.forEach((result) => {
            const {
              name,
              version,
              description,
              publisher,
            } = result.package;

            const formattedDetails = formatPackageDetails({
              name,
              version,
              description,
              author: publisher.username,
            });

            formattedPackageDetails.push(formattedDetails);

            packageDetailsMapping[formattedDetails] = { name, version };
          });

          this.packageDetailsMapping = packageDetailsMapping;

          return formattedPackageDetails;
        },
      },
    ]);

    return this.packageDetailsMapping[npmPackage];
  }
}

export default PackageSearchPrompter;
