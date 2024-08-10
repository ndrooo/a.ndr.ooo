---
tags:
  - accessibility
  - guide
---
A lot of web developers don't know where to start making their UIs [[Web accessibility|accessible]]. Accessibility can be intimidating, and some accessibility issues in complex UIs take expertise, testing, and user research to be resolved properly. Luckily, most UIs aren't very complex, and most major accessibility issues fall into a few simple categories. There's lots of low-hanging fruit to be picked, and all it takes is to follow some simple guidelines. With that in mind, this is my attempt at an audit that doesn't take much in depth knowledge to perform and will (in my experience) turn up lots of easily-fixed issues in a short amount of time.

> [!tip] If you're looking for an easy way to contribute to open source...
> Look no further! Lots of mid-size web projects will have issues you can find with this audit, and the tasks here (small, self contained fixes) are great for learning web development.
## The tab test
The absolute most straightforward manual accessibility test! You don't need the developer console, you don't need to run a screen reader or any other assistive technology. These instructions are written for people without vision impairments but if you're blind or vision-impaired you can do a lot of this with a screen reader too.

Click the address bar and start hitting the <kbd>tab</kbd> key. Once you get past the other buttons in your browser, this will take you through the [[Focus order|focus order]] of the page. You can use <kbd>Shift</kbd> + <kbd>tab</kbd> to go backwards. People with mobility impairments who can't use a mouse and keyboard will often be using your page in this way, but it's also a great way of catching lots of broader accessibility issues really fast!

Now that you know how to get around with <kbd>tab</kbd>, what should you actually look for? Well:
### Can you tell it's focused?
Every time you hit <kbd>tab</kbd>, you should be able to tell that you've moved to a new element, and you should be able to tell what element you've moved to. If you're navigating by vision, that almost always comes in the form of a [[Focus highlight|focus highlight]]. Some pages implement custom focus highlights but these days every browser has good defaults for focus highlighting that use the [outline](https://developer.mozilla.org/en-US/docs/Web/CSS/outline) of an element.

The most common issue here is that a developer has set `outline: none` on an element or used `all: unset`. Get rid of that or add a custom highlight with [good color contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) and you're ready to go!
### Is it interactive?
This is often misunderstood, but the rule is straightforward. If you can [[Interactability|interact]] with it, it should be in the focus order. If you can't, it shouldn't be. That means clicking, typing, arrow keys, whatever. Plenty of "important" but non-interactive elements won't be in the tab order, and they shouldn't be! The focus order exists for mobility-impaired users, and users with different needs (e.g. blind users) have different ways of getting around.

> [!warning] Important caveat!
> It's sometimes okay for an interactive element to be reachable by basic keyboard interactions. For example, you may only be able to tab to the first element of a checklist, but you can use the arrow keys to get to the other elements. That's fine, and can be a better experience!

If elements are in the focus order that aren't interactive, it's annoying and confusing. If elements that are interactive are not in the focus order, they are broken! Make sure you check both.

> [!tip] Three slightly less important caveats!
> 1. If something (e.g. a button) would normally be interactive but it's disabled for some temporary reason, it's usually okay for it to be in the focus order.
> 2. Things in a page that can only be interacted with by hovering on them, like a "more info" tooltip, might need to be in the focus order because a keyboard-only user won't otherwise have a way to perform that interaction. That's okay, but this is usually a case you should try to avoid completely when developing a UI.
> 3. Scrolling is complicated, sorry.

The problem here is usually that the wrong HTML element is in use. For example, a `<button>` will automatically be in the tab order, and a `<div>` will not. Using [[A button should be a button|a button element as a button]] will put it in the focus order and give it other correct behaviors for free (you can easily [remove the default styling](https://css-tricks.com/overriding-default-button-styles/)). A similar principle applies for other interactive elements.

The other common culprit is the `tabindex` HTML attribute, either because `tabindex="0"` has been added to something non-interactive or because `tabindex="-1"` has been added to something interactive. `tabindex` has its uses, but they're pretty rare. If it's clearly wrong, get rid of it!
## More coming soon...