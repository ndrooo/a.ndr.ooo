---
tags:
  - accessibility
draft: true
---
- Two ways to disable an element, `disabled` and `aria-disabled`
- Core difference is focus
- Never put focus on a never-interactable element
- Elements temporarily non-interactable are different
- Disabled for clear reasons internal to the page vs. disabled for other reasons
- Opportunity to show tooltips or expose more info to user about why
- Are hover/focus only elements interactive? It's complicated
- Case to be made for avoiding tooltips altogether
- Should this be provided as an option in libraries? I think so