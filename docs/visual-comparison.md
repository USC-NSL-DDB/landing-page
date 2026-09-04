# Visual balance comparison

Baseline A is commit `5fb4d2c`, the version on `main` when this comparison began.
Variant B is branch `codex/visual-balance`. Production remains on `main`.

This compares the full set of visual changes together. It does not isolate the
effect of any individual change.

## What changed

- Replaced the two-part hero explanation with one connected caller/callee stack.
- Combined the separate benefits and product sections, immediately after the hero.
- Enlarged the existing, unmodified VS Code screenshot and linked its full-size image.
- Kept the four paper metrics and their qualifications, with readable notes close to the numbers.
- Removed fixed card heights, large gaps above mechanism titles, and repeated card summaries.
- Used neutral mechanism headings in both themes, retaining color in the icons.
- Increased supporting text and adjusted heading sizes, section padding, and contrast together.
- Kept framework names and languages on the landing page; integration sizes remain in the catalog.
- Moved compatibility into a compact, visible panel alongside integration information.
- Shortened the integrations page introduction so the support table appears sooner.
- Added a native mobile menu with link dismissal, outside-click dismissal, and Escape support.
- Simplified the final quickstart section.

Capability claims remain grounded in the baseline page's implementation and paper
references. The metrics are unchanged. The product image remains the authors'
Figure 3. This revision adds no new supported platforms or frameworks.

## Observed proportions

Measurements use the same in-app browser, loaded fonts, and light theme.
Heights are rounded CSS pixels and may vary with scrollbar or font rendering.

| Measure | Baseline A | Variant B |
| --- | ---: | ---: |
| Page height at 1163px viewport width | 5482 | 3584 |
| Product section starts at 1163px width | 2715 | 603 |
| Page height at 390px viewport width | 7702 | 5111 |
| Mechanism section height at 390px width | 1615 | 1004 |

The shorter page comes from removing repeated content and empty space, while
increasing the size of useful supporting text.

## Reproduce the comparison

Use separate checkouts so switching branches cannot change both previews:

```sh
git worktree add --detach ../ddb-landing-baseline 5fb4d2c
```

In the baseline checkout, install its locked dependencies with `npm ci`, then run
`npm run dev -- --port 3002`. In the variant checkout, run
`npm run dev -- --port 3001`.

Compare both routes, `/` and `/frameworks/`, at the same viewport and zoom, with
the same theme. Theme preferences are stored separately for each origin.
The current review session serves a frozen static baseline on port 3002.

Check the complete page at desktop and mobile widths, then try the menu,
integration navigation, full-size screenshot, and theme toggle. Keep `main`
unchanged until choosing a version. The Pages workflow deploys pushes to `main`
only, so publishing this comparison branch does not replace the production site.
