import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('react-ssr e2e', () => {
  it('should create react-ssr', async (done) => {
    const plugin = uniq('react-ssr');
    ensureNxProject('@nx-folks/react-ssr', 'dist/packages/react-ssr');
    await runNxCommandAsync(`generate @nx-folks/react-ssr:reactSsr ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Builder ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('react-ssr');
      ensureNxProject('@nx-folks/react-ssr', 'dist/packages/react-ssr');
      await runNxCommandAsync(
        `generate @nx-folks/react-ssr:reactSsr ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('react-ssr');
      ensureNxProject('@nx-folks/react-ssr', 'dist/packages/react-ssr');
      await runNxCommandAsync(
        `generate @nx-folks/react-ssr:reactSsr ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
