import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { ReactSsrSchematicSchema } from './schema';

describe('react-ssr schematic', () => {
  let appTree: Tree;
  const options: ReactSsrSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@nx-folks/react-ssr',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('react-ssr', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
