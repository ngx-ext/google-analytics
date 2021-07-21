import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';

export function addScriptToIndex(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const fileName = './src/index.html';
    const content = tree.read(fileName)?.toString();
    if (!content) {
      throw new SchematicsException(`Couldn't find src/index.html file`);
    }
    const head = '</head>';
    const position = content.indexOf(head);
    const template = `\t<script src="/assets/js/google-analytics.min.js"></script>\n`;
    const recorder = tree.beginUpdate(fileName);
    recorder.insertLeft(position, template);
    tree.commitUpdate(recorder);
    return tree;
  };
}
