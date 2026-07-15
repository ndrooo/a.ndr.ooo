---
title: Reflections on HyperPy
description: My experiences trying to build a Pythonic vision of the Web in four hours
date: 2026-07-15
---

This week at the [Recurse Center](https://www.recurse.com/) I took part in Impossible Stuff Day! That's a whole day to set an intention way beyond what you think you're capable of doing, and take around four and a half hours (including lunch) to earnestly try to complete as much of it as you can. I spent the day making a novel hypertext called [HyperPy](<>) (hypy) and a browser to implement it!

The project had two inspirations: firstly, I've been ruminating on [Ted Nelson](https://en.wikipedia.org/wiki/Ted_Nelson)'s [Project Xanadu](https://en.wikipedia.org/wiki/Project_Xanadu), an early and radically different vision of what the Web could have been. Secondly, it's always seemed odd to me that Javascript holds a special place as the "official" programming language of the Web. Even now that [WebAssembly](https://webassembly.org/index.html) is broadly available and allows any language to be compiled for Web execution, these languages are still second-class. Most notably, [WASM code can't currently directly manipulate the DOM](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Concepts#how_do_i_use_webassembly_in_my_app), which means there still needs to be a thin layer of Javascript between your code and your page. This is a design decision I don't actually take issue with, but it still begs the question - why Javascript? What would a web built on another language look like? _Why not Python?_

Building a new web ultimately means building a new set of protocols for how to describe pages, and a new browser to implement those protocols. If that sounds like an impossible thing to do in four hours, yeah - that's the idea! [Web browsers are some of the most complex programs in existence](https://browser.engineering/intro.html#real-browser-codebases) and implement complex rendering, security, accessibility, scripting, storage, permissions, and much more. Once I narrowed it down to the bare essentials, my goal was a bit simpler: make a novel [hypertext](https://en.wikipedia.org/wiki/Hypertext) that is scripted with Python. This would let us write pages, navigate to pages, and add a bit of client-side dynamic content with Python. The other thing that made this easier was working off the [Web Browser Engineering](https://browser.engineering/) textbook. This textbook goes through a Python implementation of a much more complicated browser (for the regular old Web). I ended up taking less than I thought from this, but it spared me from getting too into the weeds on HTTP.

## What did I actually build?

Essentially, HyperPy is a very simple console-based browser that renders pages with print statements and takes text input only. It uses HTTP but expects files in the `.hypy` format. I designed a very simple hypertext, also called HyperPy, and wrote a parser that turns it into a document tree. The browser fetches scripts, runs them on the document tree, and then prints the document tree to the console. It also parses IDs from the document so they can be used to address elements in scripting, and adds interaction IDs which can be used to "click" elements (e.g. sending `click 2` at the prompt to click the element with the label "2"). Most importantly for a hypertext, the browser can follow links, parsing absolute or relative URLs from link elements and rendering them in place of the current page when clicked.

With more time I would have liked to implement buttons to invoke callbacks in the scripts, which would make the scripting element much more engaging. At the same time, I still feel great about what I got done! It is verifiably a novel hypertext which natively runs Python scripts, which is more than I thought I'd be able to get done.

## CVE-2026-0000

**CNA: HyperPy Systems Incorporated**

Remote code execution vulnerability in HyperPy browser 0.1.0 on all platforms. By using hypy's `~~<` ("snake") operator as intended, the server can execute arbitrary code on the client device. Root cause is in `main.py:22-23`:

```python
for script in document.scripts:
            exec(script)
```

**Mitigations:** Don't use HyperPy, and definitely don't point it at servers you don't completely control.

**Resolution timeline:** Probably never?

### `</joke>`

Okay, so this is one of the funnier things HyperPy doesn't have - any sort of security model or sandboxing. When your Web browser downloads Javascript from the Web, it creates an environment that executes that Javascript on your computer but only allows it to do things you'd expect, like modify the page it's on, and not things you wouldn't expect, like delete all your files or steal your passwords. I looked into whether I could do this as part of HyperPy, and the answer was ["this is really non-trivial"](https://stackoverflow.com/questions/3068139/how-can-i-sandbox-python-in-pure-python), which is a very nice way of saying "no". Luckily, this is just a toy browser, and I don't need to concern myself with things like _massive catastrophic data loss_. 

So we just download the scripts and use Python's `exec` function! Figuring out exactly how to make this work was a little fiddly, but we just need to make sure we make the `document` object available so our scripts can mutate the content of the page. If the server says `import os; os.system("rm -rf ~/")`, that's your home directory gone, but on the plus side it will be a good reminder not to click on links you don't recognize.

## Dreaming of another web

Long before the World Wide Web opened to the world in 1993, people were thinking of different models for information exchange on the Internet. Nelson's Project Xanadu is just one entry in a long list of protocols, including [Gopher](https://gopher.fyi/), [Gemini](https://geminiprotocol.net/), and [Frogans](https://www.frogans.org/en/main.html). The Web isn't going anywhere, and it probably shouldn't! As the Web platform has grown, it has become more capable, more performant, more customizable, and more accessible. There are things to take issue with, such as the way that increasingly complex standards have created an oligopoly of browser engines, but these are minor gripes for the most part.

So why imagine different webs? For one thing, it's a great way to learn about the Web platform! For something that often works so seamlessly, thinking about how it breaks down into parts and how those parts interact is very useful and very intriguing. Why do these protocols work the way they do? How do you define interfaces that are simple and declarative but capable of complex behavior? It also asks deeper questions - how, what, and with whom do we want to communicate on the Internet? At time of writing, [the Wikipedia page for "hypermedia"](https://en.wikipedia.org/wiki/Hypermedia) is shorter than the page for the more specific ["hypertext"](https://en.wikipedia.org/wiki/Hypertext), which is in turn dramatically shorter than the page for [HTML](https://en.wikipedia.org/wiki/Hypertext). But it's the most general concept which has intrigued me lately. This seemingly simple idea - linking together different bits of information in a non-linear fashion - has given us so much, but still seems to have so much more to give!
