import { Rule, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@ngx-ext/schematics-api/functions';
import { SchematicsApiException } from '@ngx-ext/schematics-api/schematics-api-exception';

export function addAssetsScriptRule(): Rule {
  return (tree: Tree) => {
    const workspace = getWorkspace(tree);
    const defaultProject = workspace.defaultProject as string;
    if (!defaultProject) {
      throw new SchematicsApiException('No default project found!');
    }
    const buildConfig = workspace.projects[defaultProject].architect?.build as any;
    if (!buildConfig) {
      throw new SchematicsApiException('No build config was found.');
    }
    if (!buildConfig.options.scripts) {
      buildConfig.options.scripts = [];
    }
    buildConfig.options.scripts.push('node_modules/@ngx-ext/google-analytics/assets/js/google-analytics.min.js');
    tree.overwrite('/angular.json', JSON.stringify(workspace, null, 2));
    return tree;
  };
}
