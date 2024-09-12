---
tags:
  - accessibility
draft: false
---
There are two primary ways to accessibly disable an interactive element in [[HTML]].
1. Add the `disabled` property
2. Add the `aria-disabled` property and disable the action in code

The second option requires a bit of extra work to do properly (some extra CSS, an if statement in the event handlers) but is equally acceptable from an accessibility standpoint.

The core difference here is focus. By default, `disabled` elements will be removed from the tab order, and `aria-disabled` elements will not. Secondarily, `disabled` may also give a stronger [[HTML semantics|semantic signal]] to [[Assistive technology|assistive technology]] that the element should be ignored.

Generally speaking, focus should never be put on an element that isn't [[Interactivity|interactive]]. However, when an element that is normally interactive becomes disabled, there is more to consider. Users become familiar with the layout of a page and may be confused when an element is removed from the tab order. In addition, if information has been added to the page to explain the disablement, users may not be actively looking for that. Allowing the control to be presented similarly to an enabled element while clearly marking it as disabled acts as a hook that can inform the user what was disabled and why.

So, which one to use? It depends on the context. When the control is disabled for a clear reason based on an action the user has taken elsewhere on the page, `disabled` is the clear choice. If the user clicks "billing address is the same as shipping," the billing address fields should not stay in the taborder -- that's just spammy. When the control is disabled for a reason external to the page, like a user setting or an outage, `aria-disabled` is better. It makes clear what has happened and allows for additional context.