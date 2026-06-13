import { describe, expect, it } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { WikilinkToMarkdownLinkTransformer } from "../src/transformer";
import { createCtx } from "./helpers";

describe("WikilinkToMarkdownLinkTransformer", () => {
  it("Transform wikilinks w/ latex alias", () => {
    const ctx = createCtx();
    const transformer = WikilinkToMarkdownLinkTransformer();

    const input = "[[note|$\frac{1}{2}$ note]]";
    const expected = "[$\frac{1}{2}$ note](note)";
    const result = transformer.textTransform!(ctx, input);
    expect(result).toBe(expected);
  });
  it("Transform wikilinks w/ svg", () => {
    const ctx = createCtx();
    const transformer = WikilinkToMarkdownLinkTransformer();

    const input = "[[image.svg]]";
    const expected = "[image](image.svg)";
    const result = transformer.textTransform!(ctx, input);
    expect(result).toBe(expected);
  });
});
