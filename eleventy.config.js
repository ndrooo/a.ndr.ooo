import pluginWebc from "@11ty/eleventy-plugin-webc";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownItAttrs from "markdown-it-attrs";
import YAML from "yaml";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import utc from "dayjs/plugin/utc.js";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc, {
    components: "components/**/*.webc",
  });
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.amendLibrary("md", (mdLib) =>
    mdLib.use(markdownItAttrs, { allowedAttributes: ["id", "class"] }),
  );
  eleventyConfig.addDataExtension("yaml", (contents) => YAML.parse(contents));

  eleventyConfig.addPassthroughCopy("./css/");
  eleventyConfig.addPassthroughCopy({
    "static/*": "/",
    "static/fonts": "fonts",
    "static/88x31": "static/88x31",
  });

  eleventyConfig.addWatchTarget("./css/");
  eleventyConfig.addWatchTarget("./layouts/");
  eleventyConfig.addWatchTarget("./components/");
  eleventyConfig.addWatchTarget("./static/");

  eleventyConfig.setLiquidOptions({
    root: ["components", "pages", "layouts"],
  });

  dayjs.extend(advancedFormat);
  dayjs.extend(utc);
  eleventyConfig.addFilter("niceDate", function (dateMillis) {
    const date = dayjs(dateMillis).utc();
    return `<time datetime="${isoDate(date)}">${niceDate(date)}</time>`;
  });

  eleventyConfig.addJavaScriptFunction("getPage", function (name, collection) {
    return collection.find(
      (page) => page.data.title.toLowerCase() === name.toLowerCase(),
    );
  });

  eleventyConfig.addJavaScriptFunction(
    "getNextWWOPage",
    (name, wwo, collection) => {
      return getWWOPageInDirection(name, wwo, collection, 1);
    },
  );

  eleventyConfig.addJavaScriptFunction(
    "getPrevWWOPage",
    (name, wwo, collection) => {
      return getWWOPageInDirection(name, wwo, collection, -1);
    },
  );

  return {
    dir: {
      input: "pages",
      output: "public",
      includes: "../layouts",
    },
    htmlTemplateEngine: "webc",
  };
}

function niceDate(dateObj) {
  return dateObj.year() === dayjs().utc().year()
    ? dateObj.format("dddd, MMMM Do")
    : dateObj.format("MMMM Do, YYYY");
}

function isoDate(dateObj) {
  return dateObj.format("YYYY-MM-DD");
}

function getWWOPageInDirection(name, wwo, collection, direction) {
  const currentIndex = wwo.findIndex(
    (testName) => testName.toLowerCase() === name.toLowerCase(),
  );
  if (currentIndex === -1) return null;
  for (
    let i = currentIndex + direction;
    i < wwo.length && i >= 0;
    i = i + direction
  ) {
    const testName = wwo[i];
    if (
      collection.some(
        (page) => page.data.title.toLowerCase() === testName.toLowerCase(),
      )
    ) {
      const foundPage = collection.find(
        (page) => page.data.title.toLowerCase() === testName.toLowerCase(),
      );
      return foundPage;
    }
  }
  return null;
}
