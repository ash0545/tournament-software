# Record architecture decisions / ADR template

- Status: Accepted
- Authors: [AuthorName](mailto:example@example.com)

## Context

We are recording the architectural decisions made on this project. This helps us:

- take better decisions, that are team reviewed
- update decisions if we need to, with appropriate argumentation
- ensure newcomers to the project have all the context and history of decision-making

## Decisions

- We will use the structure of this document as the template for all subsequent ADRs (Architecture
  Decision Records).

## Consequences / adaptations

- This template is [based on work from Michael
  Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).
- ADRs are named as YYYY-MM-DD-brief-title.
- ADRs are immutable once merged in the repo.
  - They can be in draft status while the PR is open but they should be accepted once the PR is
    merged.
  - If reverted, we mark the status as superseded and create a new ADR with the new decision.
- Simple pros/cons analysis and any relevant info for the decision belong in the ADR.
  - Other information, spikes, HOW-TOs, troubleshooting etc. is in other documentation e.g. a
    README.
  - This other documentation is not linked to the ADR to avoid having to maintain links.
- We aim for "Single Responsibility" and "as-concise-as-possible" ADRs, while staying pragmatic.

## References
