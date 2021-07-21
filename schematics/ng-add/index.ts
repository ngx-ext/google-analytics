import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addImportToRootModule } from './add-declaration-to-module.rule';
import { installDependencies } from './install-dependencies.rule';
import { addAssetsScriptRule } from './add-assets-script.rule';

export function ngAdd(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([
      installDependencies(),
      addImportToRootModule(),
      addAssetsScriptRule(),
    ]);
  };
}
