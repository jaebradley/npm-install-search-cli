import chalk from 'chalk';

const formatScore = (score) => {
  const roundedScore = Math.round(score * 100);

  if (roundedScore === 100) {
    return '💯';
  } if (roundedScore > 90) {
    return `🥇  ${chalk.greenBright.bold(`(${roundedScore}/100)`)}`;
  } if (roundedScore > 80) {
    return `🥈  ${chalk.green.bold(`(${roundedScore}/100)`)}`;
  } if (roundedScore > 70) {
    return `🥉  ${chalk.magentaBright.bold(`(${roundedScore}/100)`)}`;
  } if (roundedScore > 60) {
    return `😅  ${chalk.magenta.bold(`(${roundedScore}/100)`)}`;
  } if (roundedScore > 50) {
    return `🤔  ${chalk.blue.bold(`(${roundedScore}/100)`)}`;
  } if (roundedScore > 40) {
    return `😯  ${chalk.blueBright.bold(`(${roundedScore}/100)`)}`;
  } if (roundedScore > 30) {
    return `🤞  ${chalk.yellow.bold(`(${roundedScore}/100)`)}`;
  } if (roundedScore > 20) {
    return `😳  ${chalk.yellowBright.bold(`(${roundedScore}/100)`)}`;
  } if (roundedScore > 10) {
    return `🙏 ${chalk.red.bold(`(${roundedScore}/100)`)}`;
  } if (roundedScore > 0) {
    return `🥔  ${chalk.redBright.bold(`(${roundedScore}/100)`)}`;
  }

  return '';
};

const formatPackageDetails = ({
  name,
  version,
  description,
  author,
  score,
}) => `📦  ${chalk.green.bold(name)} | 📌  ${chalk.cyan.underline(version)} | 🏷️  ${chalk.yellow.bold(description)} | ⌨️  ${chalk.blueBright.underline(`@${author}`)} | ${formatScore(score)}`;

export default formatPackageDetails;
