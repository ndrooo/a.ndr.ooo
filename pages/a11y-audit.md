---
title: A pretty good web accessibility audit
description:
  Some ideas for HTML/CSS beginners that might help quickly make your website
  more accessible to everyone.
---

# A pretty good web accessibility audit

It's an exciting thing to see so many people getting interested in making websites for fun! While you're learning your web basics and building your website, it's also important to learn how to make sure your website is accessible to everyone.

Complex, widely used websites need testing by experienced people using specialized tools. Your average hobby website, on the other hand, benefits from tons of work undertaken over the last decade to make the web accessible by default. With that said, there are still plenty of common issues that are easy to catch and fix. So here's an overview of how to do that, from the simple automated tools you can use to the manual checks and nuances you should look for.

## Tools

Automated tools to test accessibility can be a big help, particularly because you can run them regularly. Be warned though: don't just stop at the automated tools! These tools can't detect your intent. If the page is partially wrong, they can catch the inconsistency. If many things are wrong in the same way, they might not! A human being with a brain is the best accessibility checker. With that said, here are some useful tools to supplement that process:

<lines-list>

- [WAVE](https://wave.webaim.org/) is a useful tool that's easy to run on any website and will turn up lots of real issues.
- The [Lighthouse audit](https://developer.chrome.com/docs/lighthouse/) is built into Chrome/Chromium browsers and usable elsewhere, with pretty good accessibility checks and checks for e.g. performance as well.
- Deque's [Axe](https://www.deque.com/axe/) is an industry standard, but some of their tools cost money.

</lines-list>

## The tab test

I think this is the simplest manual test you can do and probably the most impactful. People with vision impairments and people with mobility impairments all need to be able to interact with your page without using a mouse. There are many different methods they use for this in real life but the most basic and the easiest to test is **tab navigation**. You can do it without any special tools and still catch a lot of issues!

To get started, click the URL bar and then start hitting the <kbd>tab</kbd> key. This will take you through the [focus order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html) of your page, moving your **browser focus** between different elements of the page. Use <kbd>Shift</kbd> + <kbd>tab</kbd> to go backwards. Now that you know how to get around, here's what you should look for:

### Can you tell it's focused?

Every time you hit <kbd>tab</kbd>, you should be able to tell you've moved to a new element, and you should be able to tell which element your browser focus is on. The browser has a default highlight, usually a little ring that shows up around what you're focused on. Also make sure that you can tell which item the focus is on without relying on color!

If you aren't seeing anything at all, the most common issue is that you've set `outline: none` in the CSS for the affected element. Remove that rule or add a custom highlight using the `:focus-visible` selector (but make sure it relies on something other than color!). You could also be doing something to hide the element that's getting focus, so it's worth checking that too.

### Is it interactive?

It's often misunderstood, but the rule is simple: if it is **interactive**, it should be in the focus order. If it's not, it shouldn't be. Interactive means: can the user do something to interact with it. That could mean "clicking" by pressing <kbd>Space</kbd> or <kbd>Enter</kbd>, it could mean scrolling using the arrow keys, or it could be as simple as a tooltip that pops up automatically when you put focus on the element.

As you're tabbing through, ask whether each element you tab to is interactive, and ask yourself whether there are any elements that are interactive that you never reach. This should mostly happen automatically: tags like `<a>`, `<button>`, and `<input>` are included in the tab order by default. There are two common culprits here:

1. You've used an element like `<div>` to make your fancy button, so the browser doesn't know it's interactive. There are too many issues with doing something like this to list here. Use the right tag, and write a bit more CSS to style it how you want.
2. You're using the `tabindex` attribute, which manually changes whether something is in the tab order. Most of the time that's a bad idea! You should probably find a different way to do what you were trying to do.

A few caveats:

- For some groups of interactive elements, such as radio buttons, you may only be able to tab to the first one in the group, but that's by design. You can use the arrow keys to reach the others, and since that's an established pattern it's acceptable.
- It's ok for _temporarily_ disabled elements to be in the focus order even though you can't interact with them at that moment.

### Does it make sense?

This is a little more subjective. Are you jumping around the page randomly? Does the order feel like how you would "read" the page naturally? Is it pleasant and usable? Does it generally work the same forwards and backwards?

## More coming soon!

## Further reading

<lines-list>

- [A11ycasts](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g) is an engaging and useful selection of videos on web accessibility.
- The [A11y project](https://www.a11yproject.com/) has a whole lot of writing on good patterns for web accessibility!
- [Accessibility Support](https://a11ysupport.io/) is a more advanced resource but useful for knowing if a particular technique for making something accessible will work in real life.

</lines-list>
