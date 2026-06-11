import { describe, expect, it } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { WikilinkToMarkdownLinkTransformer } from "../src/transformer";
import { createCtx } from "./helpers";

describe("WikilinkToMarkdownLinkTransformer", () => {
  it("Swap wikilinks for markdown link", async () => {
    const ctx = createCtx();
    const transformer = WikilinkToMarkdownLinkTransformer();
    const plugins = transformer.markdownPlugins?.(ctx) ?? [];

    const file = await unified()
      .use(remarkParse)
      .use(plugins)
      .use(remarkStringify)
      .process("[[note|$\frac{1}{2}$ note]]");

    expect(String(file)).toContain("[$\frac{1}{2}$ note](note)");
  });
});
