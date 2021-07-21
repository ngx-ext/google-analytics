import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addImportToRootModule } from './add-declaration-to-module.rule';
import { installDependencies } from './install-dependencies.rule';
import { createGoogleAnalyticsScript } from './create-google-analytics-script.rule';
import { addScriptToIndex } from './add-script-to-index.rule';

export function ngAdd(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([
      installDependencies(),
      addImportToRootModule(),
	  createGoogleAnalyticsScript(),
	  addScriptToIndex(),
    ]);
  };
}
