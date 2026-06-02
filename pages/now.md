# What I am doing now

This is a [now page](https://indieweb.org/now) with short and wildly sporadic updates on what I'm up to.

{% for now in collections.now %}
    <h2>{{now.date | date: '%b %d, %Y', 'UCT'}}</h2>
    {{now.content}}
{% endfor %}