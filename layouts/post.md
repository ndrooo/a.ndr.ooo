---
layout: base.webc
---

# {{title}}

{{page.date | niceDate}} |
{%for tag in tags%}{{tag}} {%endfor%}
{.subtitle}

{{content}}
