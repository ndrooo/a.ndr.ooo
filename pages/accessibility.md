---
title: Web accessibility
description: Resources for building accessible websites!
---

# Web accessibility

Resources for building accessible websites!
I'm always really excited to learn about new accessibility resources - [recommend me something](mailto:a@ndr.ooo)!

## My (meager) writing
{% for post in collections.accessibility reversed %}
    {{post.date | niceDate}} - [{{post.data.title}}]({{post.url}})
{% endfor %}

## Other people's work
- I highly recommend [Adrian Roselli's blog](https://adrianroselli.com/)
- The [A11ycasts videos](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g) are a bit old at this point but still good - they are a little disorganized though and target many different audiences. Some of my favorites:
  - [Just use \<button\>](https://youtu.be/CZGqnp06DnI?si=RuXMHRnoRuq6p37T)
  - [Why do semantics matter?](https://youtu.be/g2tzEil5TL0?si=Obqe0sK16xbvw1EP)
- [Heydon Pickering's blog](https://heydonworks.com/latest/)
- [Ben Myers' blog](https://benmyers.dev/)
- [The a11y project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)
- [Inclusive Design Principles](https://inclusivedesignprinciples.info/)

## Useful tools
- The [WAVE accessibility checker](https://wave.webaim.org) is great! I'd also recommend trying out the [browser extension](https://wave.webaim.org/extension/) which is much more flexible.
- The [Lighthouse audit](https://developer.chrome.com/docs/lighthouse/) is built into Chrome/Chromium browsers and usable elsewhere, with pretty good accessibility checks alongside other useful validators.
- Deque's [Axe](https://www.deque.com/axe/) is an industry standard, but some of their tools cost money.
