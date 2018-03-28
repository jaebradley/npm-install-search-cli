import chalk from 'chalk';

const formatPackageDetails = ({
  name,
  version,
  description,
  author,
}) => `📦  ${chalk.green.bold(name)} | 📌  ${chalk.cyan.underline(version)} | 🏷️  ${chalk.yellow.bold(description)} | ⌨️  ${chalk.blueBright.underline(`@${author}`)}`;

export default formatPackageDetails;
