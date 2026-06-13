import type { QuartzTransformerPlugin, BuildCtx } from "@quartz-community/types";

/**
 * 
 * @returns Converts Wikilinks INTO Markdown links
 * No user options needed
 */
export const WikilinkToMarkdownLinkTransformer: QuartzTransformerPlugin = () => {

  return {
    name: "Wikilink-to-MarkdownLink",
    
    textTransform(_ctx: BuildCtx, src: string) {
      let text = src;

      /* ----------------------------------------------------------------------
         1. Latex-Alias Wikilink Transformer
         Matches: [[Path|Alias w/ $$ ]] → [Alias w/ $$](Path)
      ---------------------------------------------------------------------- */
      // (?<!\!)              -> Negative lookbehind. Explicitly ignores image embeds like ![[image.png]]
      // \[\[                 -> Matches the literal opening brackets
      // ([^\]|]+)            -> Capture Group 1 (Path): Matches everything up to the pipe character
      // \|                   -> Matches the literal pipe. This ENFORCES that an alias exists.
      // ([^\]]*?\$[^\]]*?\$) -> Capture Group 2 (Alias): Matches everything after the pipe up to the closing brackets & latex
      // \]\]                 -> Matches the literal closing brackets
      const wikilinkRegex = /(?<!!)\[\[([^\]|]+)\|([^\]]*?\$[^\]]*?\$)\]\]/g;
      text = text.replace(wikilinkRegex, (_match, path, alias) => {
        return `[${alias}](${path})`;
      });
      
      /* ----------------------------------------------------------------------
         2. SVG Wikilink Transformer (Bypass Quartz Crawler Ignorance)
         Matches: ![[image.svg]], [[image.svg]], ![[image.svg|Alias]], etc.
      ---------------------------------------------------------------------- */
      // (!?)              -> Capture Group 1: Optional '!' (detects if it's an image embed)
      // \[\[              -> Matches literal '[['
      // ([^\]|]+\.svg)    -> Capture Group 2: The path, strictly enforcing it ends in .svg
      // (?:\|([^\]]*))?   -> Optional Non-Capturing Group for the pipe, containing Capture Group 3 (The Alias)
      // \]\]              -> Matches literal ']]'
      // 'gi' flag         -> Global & Case-Insensitive (matches .SVG or .svg)
      const svgRegex = /(!?)\[\[([^\]|]+\.svg)(?:\|([^\]]*))?\]\]/gi;

      text = text.replace(svgRegex, (_match, isEmbed, path, alias) => {
        // Strip the .svg extension (case-insensitive) for the fallback display name
        const cleanPath = path.replace(/\.svg$/i, "");
        // If there is an alias, use it.
        // If there is no alias, but it's an image (!), leave alt text blank.
        // If there is no alias, and it's a standard link, use the path as the display text.
        const display = alias ? alias : (isEmbed ? "" : cleanPath);
        
        // Output standard Markdown: ![alt](path) or [display](path)
        return `${isEmbed}[${display}](${path})`;
      });

      return text;
    },

    // NOT needed: markdownPlugins, htmlPlugins, externalResources
  };
};
