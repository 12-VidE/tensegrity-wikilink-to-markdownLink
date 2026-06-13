import { createRequire } from 'module';

createRequire(import.meta.url);

// src/transformer.ts
var WikilinkToMarkdownLinkTransformer = () => {
  return {
    name: "Wikilink-to-MarkdownLink",
    textTransform(_ctx, src) {
      let text = src;
      const wikilinkRegex = /(?<!!)\[\[([^\]|]+)\|([^\]]*?\$[^\]]*?\$)\]\]/g;
      text = text.replace(wikilinkRegex, (_match, path, alias) => {
        return `[${alias}](${path})`;
      });
      const svgRegex = /(!?)\[\[([^\]|]+\.svg)(?:\|([^\]]*))?\]\]/gi;
      text = text.replace(svgRegex, (_match, isEmbed, path, alias) => {
        const cleanPath = path.replace(/\.svg$/i, "");
        const display = alias ? alias : isEmbed ? "" : cleanPath;
        return `${isEmbed}[${display}](${path})`;
      });
      return text;
    }
    // NOT needed: markdownPlugins, htmlPlugins, externalResources
  };
};

export { WikilinkToMarkdownLinkTransformer };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map