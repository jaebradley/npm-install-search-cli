import inquirer from 'inquirer';
import InquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import { getSuggestions } from 'npms-client';

import formatPackageDetails from './formatPackageDetails';

inquirer.registerPrompt('autocomplete', InquirerAutocompletePrompt);

class PackageSearchPrompter {
  constructor() {
    // goddamn hacky memoization
    this.packageDetailsMapping = {};
  }

  async getPackageDetails(searchTerm) {
    const packageResults = await getSuggestions({ terms: [searchTerm] });

    const formattedPackageDetails = [];
    const packageDetailsMapping = {};
    this.packageDetailsMapping = {};

    packageResults.forEach((result) => {
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
        score: result.score.final,
      });

      formattedPackageDetails.push(formattedDetails);

      packageDetailsMapping[formattedDetails] = { name, version };
    });

    this.packageDetailsMapping = packageDetailsMapping;
    return formattedPackageDetails;
  }

  async prompt() {
    const { npmPackage } = await inquirer.prompt([
      {
        type: 'autocomplete',
        name: 'npmPackage',
        message: 'Search for npm package',
        source: async (answersSoFar, searchTerm) => {
          if (!searchTerm) {
            return [];
          }

          return this.getPackageDetails(searchTerm);
        },
      },
    ]);

    return this.packageDetailsMapping[npmPackage];
  }
}

export default PackageSearchPrompter;
