# Mahmoud Hub roadmap

## Product direction

Mahmoud Hub is a private learning platform with two protected experiences:

- **Admin portal:** Mahmoud creates students, organizes groups, publishes assignments, schedules sessions, and reviews submissions.
- **Student hub:** learners see their queue, practice Python in the browser, submit work, track feedback, and build a visible learning history.

Firebase Authentication is the identity layer. Cloud Firestore is the source of truth. The browser Python runtime is Pyodide running inside a Web Worker with a short execution timeout.

## Phase 0: Stabilize the foundation

Current foundation:

- Separate Hub Firebase app configuration
- Admin-only authorization for `ONm43id8YgOFon8lVWMRMHcGqBs2`
- Student email/password sign-in
- Admin and student portal surfaces
- Student account creation function scaffold
- Firestore rules for students, assignments, groups, sessions, and submissions
- Browser Python workspace with paired brackets, indentation, execution, and submission
- Light and dark Hub themes

Before production use:

1. Enable Email/Password authentication in the Hub Firebase project.
2. Add the Hub Firebase variables to the production hosting environment.
3. Upgrade the Firebase project to Blaze only if the secure account-creation function is needed.
4. Deploy the Cloud Function and Firestore rules.
5. Create and test one student account.

## Phase 1: Complete the learning data model and navigation

Collections:

- `hub_students`: profile, group, status, first-login state
- `hub_groups`: cohort name, level, description, members
- `hub_assignments`: instructions, starter code, deadline, group, publication state
- `hub_submissions`: code, output, status, feedback, timestamps, reviewer
- `hub_sessions`: date, notes, group, attendance state
- `hub_progress`: per-student assignment and topic progress

Portal work:

- Deep links for every admin and student section
- Shared empty, loading, and error states
- Explicit published/draft/archive states
- Consistent assignment and submission identifiers

## Phase 2: Build the student learning experience

- Student profile and account settings
- Assignment detail view with instructions and due date
- Draft autosave to Firestore
- Submission history and resubmission flow
- Feedback display with reviewed and needs-work states
- Progress dashboard by assignment and topic
- Upcoming sessions and preparation notes
- First-login password change flow

## Phase 3: Build admin teaching operations

- Roster search and filtering
- Edit student profile and group membership
- Archive or reactivate students
- Group editing and member overview
- Assignment editor with draft, publish, archive, and duplicate actions
- Session edit, cancel, attendance, and notes
- Submission queue filters and review workflow
- Admin export of roster, assignments, and submissions

## Phase 4: Feedback, progress, and classroom communication

- Structured feedback attached to each submission
- Topic tags such as variables, conditions, loops, functions, and data structures
- Progress calculations based on completed and reviewed work
- Student-facing feedback timeline
- Optional announcements for groups
- Optional session reminders

Automated tests remain intentionally out of the first release, but the data model will leave room for test cases and instructor-authored checks later.

## Phase 5: Security, testing, deployment, and documentation

- Verify every Firestore rule with admin, student, and unauthenticated cases
- Keep code execution isolated in a Web Worker with timeout and standard-library-only scope
- Validate all account, assignment, group, and feedback inputs
- Add rate limiting around account creation through the backend
- Test mobile layouts and reduced-motion behavior
- Deploy frontend and Cloud Functions separately
- Add budget alerts if Blaze is enabled
- Document admin onboarding and student onboarding

## Release order

The first useful release is Phase 0 plus the highest-value parts of Phases 1 and 2: students can sign in, see an assignment, write and run Python, submit, and view the result; Mahmoud can create accounts, organize students, publish work, and review submissions.
