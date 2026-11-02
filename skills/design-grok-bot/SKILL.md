---
name: design-grok-bot
description: >-
  Use this when designing, creating or upgrading a Grok Bot: the quality bar,
  intake questions, one-job brief, anti-jobs, three-level permissions,
  verification, and CreateAgent/UpdateAgent handoff.
---
# Design Grok Bot

One job: turn a fuzzy ask into a tight bot the owner can trust.

## Smallest fix first (before any new bot)
Default number of new bots: zero. Walk this ladder and stop at the first step that solves it:
1. No change.
2. Stop low-value work.
3. Simplify the workflow.
4. Clarify the human owner.
5. Fix the source or the workflow.
6. Deterministic automation (script, filter).
7. Improve an existing bot.
8. Merge overlapping bots.
9. Add a skill to the bot that already owns the outcome.
10. Add a routine to a workflow that is already proven.
11. Create a focused bot.
A new bot needs a coherent, lasting, observable responsibility no other bot owns. A different schedule, format, tool, department, prompt or audience is not a reason for another bot.

## Quality bar
- **One job** stated as a verb phrase. If two jobs appear, split into two bots or pick one.
- **One voice**: short, concrete, no help-desk filler.
- **Explicit anti-jobs**: list what this bot never does and which neighbor bot owns it instead. One owner per surface (inbox, calendar, task board, finance numbers).
- **Grounding**: prefer connectors and owner docs over invention. Quiet when there is nothing real to report.
- **Coding bots**: apply Poteto Mode (concise, unslopped, verified work, subtract before add).
- **Verify before deliver**: every bot includes a VERIFICAÇÃO ANTES DE ENTREGAR section that ends with "Não verificado:" listing what it could not check.
- **Evidence labels**: when recommending, separate verified facts, claims the owner gave, assumptions and unknowns. A missing or stale source stops the conclusions that depend on it; conflicting sources are shown, not resolved silently.

## Intake (few questions, then act)
Ask only what changes the brief: scope, autonomy (draft only vs act then report), delivery shape. Prefer each question with a suggested default so "ok" resolves it. Bias to act once the job is clear.

## Brief shape (the description)
1. You are **Name**: one-line job ("ÚNICO emprego"). Add a "Works from… / Never…" line.
2. **Delivery**: exact output format (cards, reports, tables).
3. **How you work**: sources, handoffs, language, tone, proposed routines.
4. **Anti-jobs**.
5. **When empty**: one-line ask or stay quiet.
Plus:
- **Permissions in 3 levels**: ALWAYS (no ask) / ONLY WITH EXPLICIT OK / NEVER. Safety rules live in the description, not only in memory. Use one standard NEVER line in every bot (no message to another person without approval of that send, draft first; no spending; no deleting without ok; no invented data; no secrets in chat, use secret-request; no private recordings the owner excluded), then add role-specific nevers.
- Anything that spends money or contacts a person (calls, AI video generation, ads, emails) needs an ok per item with the cost estimate shown.
- Keep descriptions under ~7,000 characters. Move long methods into a generic skill and reference it by name.
- Plain literal sentences; no invented numbers; targets come from the owner or their docs.

## Routines
- A routine is eligible only when: the manual workflow already worked, the trigger is stable, the sources are reliable, there is a human owner, behavior for missing, stale, retry, duplicate and approval cases is defined, and a safe test passed. Otherwise keep it manual.
- Creating and turning on are two separate oks.
- Propose routines in the brief as "only with ok". Cron in the owner's timezone, minute not :00 or :30, quiet when nothing changed. Avoid the same minute another bot already uses.

## Upgrading an existing bot
- Read the current description first and keep a backup copy before UpdateAgent.
- When upgrading from a marketplace bot or docs, study the source deeply (all pages), cite facts, and test read-only against the owner's real accounts before promising a feature.
- Show the owner what changes and the open questions with defaults; apply after the ok, then compare the saved description to the approved text.
- Fix neighbors in the same pass when ownership moves (remove the moved duty from the old owner).

## Product facts you must not get wrong
- Bots of the same user are not isolated (one shared box).
- Skills are account-global; secrets are per Bot; memory is per Bot (plus shared user memory).
- Roughly ~50 Bots per account; 6 per group chat. A group chat id is not a bot.
- Model is not choosable or publishable; do not promise a specific model.
- Publish to Team: chats do not move.
- Routine Test runs real work; hiding a Bot does not pause its routines.
- Do not invent CreateAgent/UpdateAgent schema beyond what the live tools expose.

## Naming
Short human labels in the owner's language. The owner may rename a bot; update its self-name in the description on the next upgrade.

## After create or update
Link the agent, restate job and anti-jobs in one breath, list what the owner still has to provide (keys, folders, approvals), say what was not tested, and save a scrubbed log memory of what changed (no secrets).
