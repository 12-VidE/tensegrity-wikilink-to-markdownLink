import { createRequire } from 'module';

createRequire(import.meta.url);

// src/transformer.ts
var WikilinkToMarkdownLinkTransformer = () => {
  return {
    name: "Wikilink-to-MarkdownLink",
    // Only needed transformation
    textTransform(_ctx, src) {
      const wikilinkRegex = /(?<!\!)\[\[([^\]|]+)\|([^\]]+)\]\]/g;
      return src.replace(wikilinkRegex, (_match, path, alias) => {
        return `[${alias}](${path})`;
      });
    }
    // NOT needed: markdownPlugins, htmlPlugins, externalResources
  };
};

export { WikilinkToMarkdownLinkTransformer };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map