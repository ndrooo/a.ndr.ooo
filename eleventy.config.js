import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc, {
    components: "components/**/*.webc",
  });

  eleventyConfig.addPassthroughCopy("./css/");
  eleventyConfig.addWatchTarget("./css/");
  eleventyConfig.addPassthroughCopy({
    "static/*": "/",
    "static/fonts": "fonts",
  });

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
