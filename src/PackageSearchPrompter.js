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
    this.searchTerm = null;
  }

  getPackageDetails(results) {
    const choices = [];
    this.packageDetailsMapping = {};

    results.forEach((result) => {
      const {
        name,
        version,
        description,
        publisher,
      } = result.package;

      const author = publisher && publisher.username ? publisher.username : '';
      const score = result && result.score ? result.score.final : null;

      const formattedDetails = formatPackageDetails({
        name,
        version,
        description,
        author,
        score,
      });

      this.packageDetailsMapping[formattedDetails] = { name, version };
      choices.push(formattedDetails);
    });

    choices.push(DONE_SEARCHING);
    this.packageDetailsMapping[DONE_SEARCHING] = DONE_SEARCHING;

    return choices;
  }

  async prompt() {
    const { npmPackage } = await inquirer.prompt([
      {
        type: 'autocomplete',
        name: 'npmPackage',
        message: 'Search for npm package',
        // eslint-disable-next-line consistent-return
        source: async (_, searchTerm) => {
          this.searchTerm = searchTerm;
          const suggestions = searchTerm
            ? await getSuggestions({ terms: [searchTerm], size: 10 })
            : [];

          // first search will often return last
          // so in order for memoization to work correctly, need to make sure
          // only update package details when latest search term is equal to to searchTerm
          // variable in the Promise
          if (this.searchTerm === searchTerm) {
            return Promise.resolve(this.getPackageDetails(suggestions));
          }
        },
      },
    ]);

    return this.packageDetailsMapping[npmPackage];
  }
}

export default PackageSearchPrompter;
