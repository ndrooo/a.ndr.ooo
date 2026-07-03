---
title: Styling the small stuff with CSS
description: There are some small details in my website CSS that I've really enjoyed putting extra work into! Here are some of my favorites, and some brief discussion about how to make them accessible to everyone.
---

There are some small details in my website CSS that I've really enjoyed putting extra work into! Here are some of my favorites, and some brief discussion about how to make them accessible to everyone.

## Styling text selection

Focus this website and then hit <kbd>ctrl</kbd> + <kbd>a</kbd> - you'll notice that instead of the usual blue highlight I have one that matches my styles, and that **bold elements** and headers are highlighted differently. That's thanks to the [`::selection` pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::selection). It's easy to use and has pretty [wide availability](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::selection#browser_compatibility) (with some small caveats).

Here's how I set selection styles globally:

```css
::selection {
	background-color: var(--accent);
	color: var(--background);
}
```

And here's how I use [CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using) to customize my headers:

```css
h1, h2, h3, h4, h5, h6 {
	color: var(--heading);
	&::selection {
		background-color: var(--heading);
		color: var(--background);
	}
}
```

### Accessibility
There are a few accessibility concerns to watch out for when styling selection. Most importantly, make sure your text is still readable to everyone, even when selected. That means [providing enough color contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) and making sure that [color is not the only way you convey information](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html).

## Focus and hover states

Building useful and accessible CSS for links (and other interactive elements) means reacting in a clearly visible way when visitors hover over your links, and when they [focus on your links](https://www.deque.com/blog/give-site-focus-tips-designing-usable-focus-indicators/) using the keyboard. We can style both of these at the same time with the selector `a:is(:hover, :focus-visible)`. We're using [`:is`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:is) to target both states compactly, and we're using [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible) so we don't show our focus style after a normal click.

The magic `outline: none;` will clear the default focus style from your link, but with great power comes great responsibility - make sure you're still providing an obvious visual cue for your focused element! Here's an example that does a simple color inversion:

```css
a {
	color: var(--link);
	outline: none;
	&:is(:hover, :focus-visible) {
		background-color: var(--accent);
		color: var(--background);
		text-decoration-color: var(--background);
	}	
}
```

### The "both" state
If you're as finicky as me, though, it might annoy you that focused links don't do anything when you hover them! To solve that, we can come up with separate states for hover and focus which apply to separate parts of the styling. Here's what I have on my site:
```css
a {
	color: var(--link);
	outline: none;
	transition: text-decoration-thickness 0.3s;
	&:focus-visible {
		background-color: var(--accent);
		color: var(--background);
		text-decoration-color: var(--background);
	}
	&:hover {
		text-decoration-thickness: 3px;
	}
}
```

You can also specifically target the state where the link is focused and hovered, which is as simple as: `a:focus-visible:hover`. Get creative with your styles and transitions!

### Accessibility
As previously noted, make sure your focus styles are very obvious, especially if you're setting `outline: none;`. Make sure the focus states are distinguishable from the non-focus states by [something other than color](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html).