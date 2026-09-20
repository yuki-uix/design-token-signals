# Five-minute first-use trial

Purpose: collect the independent first-time-user evidence still required by [#48](https://github.com/yuki-uix/design-token-signals/issues/48). This tests the shipped selection/export workflow, not the audit experiment.

## Participant task — copy this section only

You have a small UI idea and want a starting point for its visual style. Use a disposable project or a copy you are comfortable experimenting with.

Start with the [project README](https://github.com/yuki-uix/design-token-signals#readme). In your own words, what do you expect this tool to help you do?

Using only the README and the linked tool, choose a style for your idea, obtain its reference file, and use that file in a request to your coding assistant for one small UI change. Stop before making any production change.

Please say where you get stuck, what you expected, and whether you would use the result. There are no right answers about which style to choose. We are testing the instructions, not you.

## Facilitator instructions

Recruit someone unfamiliar with this project who already has access to a coding assistant. Send only the participant section above; do not tell them the three steps, pick their profile, or supply the prompt before they try.

Allow roughly five minutes for the first attempt. Model generation or setup can take longer: record waiting time separately and allow completion afterwards. A timeout is not evidence of success or failure by itself. If the person needs help, record the exact blockage and the help provided; assisted completion is different from unassisted completion.

No recording or account access is required. Do not collect private source code or prompts; a participant can describe the outcome using a disposable example. Ask permission separately if they volunteer screenshots you intend to publish.

## Trial record

Copy this table for each real participant. Leave fields blank until observed; do not substitute an agent simulation.

| Field | Observation |
| --- | --- |
| Date / participant alias / prior familiarity | |
| README revision or PR / browser / device | |
| Coding assistant and model, if known | |
| Their explanation of the tool before trying | |
| Their small UI idea / chosen profile and reason | |
| Found the demo without help? Where did they look? | |
| Exported file name and where they put it | |
| Did the request explicitly reference the file? How? | |
| Assistant result: visible use of supplied style, ignored instructions, or unclear? | |
| Completion: unassisted / assisted / incomplete | |
| Active time / waiting time | |
| Exact points of confusion and help given | |
| Would they reuse it? Their words | |
| Follow-up documentation change suggested by the observation | |

## Acceptance and next action

For #48, record whether an unfamiliar participant can explain the purpose and complete selection → export → explicit reference in their own example. A completed download alone is not the whole flow. One successful trial satisfies the small acceptance check, not a general usability or model-reliability claim.

If the flow is incomplete, keep the issue open and fix the observed blockage before a new trial. If assistance was necessary, document it rather than retroactively labeling the trial unassisted. The implementation assistant can prepare materials and analyze recorded feedback; it cannot supply the independent human observation.

**Current status:** no trial has been conducted or recorded here.
