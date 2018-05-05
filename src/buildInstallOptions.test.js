import { buildNpmInstallOptions } from './buildInstallOptions';

describe('buildNpmInstallOptions', () => {
  it('should return options', () => {
    const options = {
      save: true,
      saveProd: true,
      saveDev: true,
      savePeer: true,
      saveOptional: true,
      saveExact: true,
      saveBundle: true,
      noSave: true,
      dryRun: true,
      global: true,
    };

    const expected = [
      '-P',
      '-D',
      '--save-peer',
      '-O',
      '-E',
      '-B',
      '--no-save',
      '--dry-run',
      '--global',
    ];

    expect(buildNpmInstallOptions(options)).toEqual(expected);
  });
});
