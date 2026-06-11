import { QuartzTransformerPlugin } from '@quartz-community/types';
export { PageGenerator, PageMatcher, QuartzComponent, QuartzComponentConstructor, QuartzComponentProps, QuartzEmitterPlugin, QuartzFilterPlugin, QuartzPageTypePlugin, QuartzPageTypePluginInstance, QuartzTransformerPlugin, StringResource, VirtualPage } from '@quartz-community/types';

/**
 *
 * @returns Converts Wikilinks INTO Markdown links
 * No user options needed
 */
declare const WikilinkToMarkdownLinkTransformer: QuartzTransformerPlugin;

export { WikilinkToMarkdownLinkTransformer };
