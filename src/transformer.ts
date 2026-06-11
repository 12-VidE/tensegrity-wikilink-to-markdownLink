import type { QuartzTransformerPlugin, BuildCtx } from "@quartz-community/types";

/**
 * 
 * @returns Converts Wikilinks INTO Markdown links
 * No user options needed
 */
export const WikilinkToMarkdownLinkTransformer: QuartzTransformerPlugin = () => {

  return {
    name: "Wikilink-to-MarkdownLink",
    
    // Only needed transformation
    textTransform(_ctx: BuildCtx, src: string) {
      // Regex isolation: Matches [[Path|Alias]]
      // (?<!\!)        -> Negative lookbehind. Explicitly ignores image embeds like ![[image.png]]
      // \[\[           -> Matches the literal opening brackets
      // ([^\]|]+)      -> Capture Group 1 (Path): Matches everything up to the pipe character
      // \|             -> Matches the literal pipe. This ENFORCES that an alias exists.
      // ([^\]]+)       -> Capture Group 2 (Alias): Matches everything after the pipe up to the closing brackets
      // \]\]           -> Matches the literal closing brackets
      const wikilinkRegex = /(?<!!)\[\[([^\]|]+)\|([^\]]+)\]\]/g;

      // Execute string replacement
      return src.replace(wikilinkRegex, (_match, path, alias) => {
        // Invert into standard markdown link syntax: [Alias](Path)
        return `[${alias}](${path})`;
      });
    },

    // NOT needed: markdownPlugins, htmlPlugins, externalResources
  };
};
