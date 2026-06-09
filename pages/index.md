---
title: a.ndr.ooo
description: Andrew Sherman's website
---

# Andrew Sherman

I'm **Andrew**, a software developer and curious person in New York City. Learn more [about me](/about/#human), or contact me at [a@ndr.ooo](mailto:a@ndr.ooo).

---

## Right now...

{% assign latestNow = collections.now.last %}

{{latestNow.content}}

{% render "iam-table", iam: latestNow.data.iam %}

{{latestNow.date | niceDate}} - [see older updates](/now/)

<section-card title="Making websites" src="/website-stuff.svg" alt="Pixelated doodle of a paintbrush on a globe inside a web browser." href="/web/">

A collection of resources and inspiration for personal or hobby websites

</section-card>

<section-card title="Web accessibility" src="/a11y.svg" alt="Pixelated doodle of a person surrounded by assistive technologies and representations of web browsing." href="/accessibility/">

**In progress**: a simple web accessibility audit intended for small and simple websites

</section-card>

<section-card title="NYC ephemera" src="/nyc-ephemera.png" alt="Pixelated doodle of a collection of NYC-related things: the Keano eye-in-pyramid, the Chrysler building and AT&T long lines building, a Redbird train, the parks department logo, a pigeon and a rat." href="/nyc-ephemera/">

Links to odd or unique things I've learned about New York City

</section-card>

<webring-footer />
