---
override:tags: []
layout: base.webc
---

# Posts

{% for post in collections.post reversed %}
    {{post.date | niceDate}} - [{{post.data.title}}]({{post.url}})
{% endfor %}