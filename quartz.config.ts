import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "HOME",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    baseUrl: "notes.zoewinters.me",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
        theme: {
      typography: {
        header: "Signika Negative",
        body: "Exo 2",
        code: "IBM Plex Mono",
        // code: "Source Code Pro",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        darkMode: {
          light: "rgb(30, 30, 30)",
          lightgray: "rgb(80, 80, 80)",
          gray: "#ebebeb",
          darkgray: "rgb(241, 244, 244)",
          dark: "rgb(241, 244, 244)",
          secondary: "#f88c85",
          tertiary: "rgb(255, 174, 168)",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        // lightMode: {
        //   light: "#faf8f8",
        //   lightgray: "#e5e5e5",
        //   gray: "#b8b8b8",
        //   darkgray: "#4e4e4e",
        //   dark: "#2b2b2b",
        //   secondary: "#284b63",
        //   tertiary: "#84a59d",
        //   highlight: "rgba(143, 159, 169, 0.15)",
        // },
        // darkMode: {
        //   light: "#161618",
        //   lightgray: "#393639",
        //   gray: "#646464",
        //   darkgray: "#d4d4d4",
        //   dark: "#ebebec",
        //   secondary: "#7b97aa",
        //   tertiary: "#84a59d",
        //   highlight: "rgba(143, 159, 169, 0.15)",
        // },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"], // you can add 'git' here for last modified from Git but this makes the build slower
      }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest", openLinksInNewTab: true}),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.Description(),
    ],
    filters: [Plugin.ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
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
