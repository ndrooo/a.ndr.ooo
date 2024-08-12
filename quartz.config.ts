import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "a.ndr.ooo",
    enableSPA: false,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "a.ndr.ooo",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Besley",
        body: "Atkinson Hyperlegible",
        code: "Victor Mono",
      },
      colors: {
        lightMode: {
          light: "rgb(11, 13, 18)",
          lightgray: "#192239",
          gray: "#8484c4",
          darkgray: "rgb(236, 220, 238)",
          dark: "#8Fa5f5",
          secondary: "#9270d7",
          tertiary: "#00bfa5",
          highlight: "#192239",
          textHighlight: "#b3aa0288",
        },
        darkMode: {
          light: "rgb(11, 13, 18)",
          lightgray: "#192239",
          gray: "#646464",
          darkgray: "rgb(236, 220, 238)",
          dark: "#8Fa5f5",
          secondary: "#9270d7",
          tertiary: "#84a59d",
          highlight: "#192239",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
