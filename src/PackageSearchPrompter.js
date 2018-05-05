import inquirer from 'inquirer';
import InquirerAutocompletePrompt from 'inquirer-autocomplete-prompt';
import { getSuggestions } from 'npms-client';

import formatPackageDetails from './formatPackageDetails';
import { DONE_SEARCHING } from './constants';

inquirer.registerPrompt('autocomplete', InquirerAutocompletePrompt);

class PackageSearchPrompter {
  constructor() {
    // goddamn hacky memoization
    this.packageDetailsMapping = {};
  }

  async getPackageDetails(searchTerm) {
    const packageResults = await getSuggestions({ terms: [searchTerm] });

    const packageDetailsMapping = {};
    this.packageDetailsMapping = {};
    // ensures that done searching option is selectable
    const formattedPackageDetails = [DONE_SEARCHING];
    this.packageDetailsMapping[DONE_SEARCHING] = DONE_SEARCHING;

    packageResults.forEach((result) => {
      const {
        name,
        version,
        description,
        publisher,
      } = result.package;

      const author = publisher ? publisher.username : '';
      const score = result && result.score ? result.score.final : null;

      const formattedDetails = formatPackageDetails({
        name,
        version,
        description,
        author,
        score,
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
            // ensures that done searching option is selectable
            this.packageDetailsMapping[DONE_SEARCHING] = DONE_SEARCHING;
            return [DONE_SEARCHING];
          }

          return this.getPackageDetails(searchTerm);
        },
      },
    ]);

    return this.packageDetailsMapping[npmPackage];
  }
}

export default PackageSearchPrompter;
