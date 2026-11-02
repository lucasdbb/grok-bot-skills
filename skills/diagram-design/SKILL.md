---
name: diagram-design
description: >-
  Use this when the user asks for an editorial, on-brand diagram or chart
  (architecture, flowchart, sequence, state machine, ER, timeline, swimlane,
  quadrant, funnel/pyramid, Sankey, Gantt, org chart, user journey, service
  blueprint and ~45 other types) delivered as a self-contained HTML/SVG/PNG
  file, or wants to redraw a draw.io, Mermaid or Excalidraw diagram in a brand
  style.
---
# Diagram Design (vendored from github.com/cathrynlavery/diagram-design, MIT)

The full upstream skill lives on the box at `/home/box/vendor-skills/diagram-design/` (SKILL.md + `references/`, `assets/`, `scripts/`). The commit it was copied from is in `.source-commit` there.

## Steps
1. Read `/home/box/vendor-skills/diagram-design/SKILL.md` in full and follow it. Resolve every relative path it mentions (`references/...`, `assets/...`, `scripts/...`) against `/home/box/vendor-skills/diagram-design/`.
2. Style-guide gate (its section 0): if the user's brand tokens are already known (memory, brand docs), use option (d) paste tokens instead of asking; keep the brand's own rules (e.g. dark background) over the skill defaults when they conflict.
3. Write output files under `/workspace/<project>/diagrams/`, not inside the vendored folder. Export PNG with `scripts/export_png.py` (headless Chrome is at `/usr/bin/google-chrome`).
4. Run `scripts/self_check.py` on the result when the upstream SKILL.md asks for it, then look at the PNG before delivering.
5. Attach the PNG (and the .html if editable output was asked for).

## Updating
To update: `git clone --depth 1 https://github.com/cathrynlavery/diagram-design /tmp/dd && rm -rf /home/box/vendor-skills/diagram-design && cp -r /tmp/dd/skills/diagram-design /home/box/vendor-skills/diagram-design && git -C /tmp/dd rev-parse --short HEAD > /home/box/vendor-skills/diagram-design/.source-commit`.
