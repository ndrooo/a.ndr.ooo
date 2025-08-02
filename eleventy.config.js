import pluginWebc from "@11ty/eleventy-plugin-webc";
import YAML from "yaml";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc, {
    components: "components/**/*.webc",
  });

  eleventyConfig.addDataExtension("yaml", (contents) => YAML.parse(contents));

  eleventyConfig.addPassthroughCopy("./css/");
  eleventyConfig.addPassthroughCopy({
    "static/*": "/",
    "static/fonts": "fonts",
  });

  eleventyConfig.addWatchTarget("./css/");
  eleventyConfig.addWatchTarget("./layouts/");
  eleventyConfig.addWatchTarget("./components/");
  eleventyConfig.addWatchTarget("./static/");

  return {
    dir: {
      input: "pages",
      output: "public",
      includes: "../layouts",
    },
    htmlTemplateEngine: "webc",
    markdownTemplateEngine: "webc",
  };
}
