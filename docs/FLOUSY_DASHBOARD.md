# Private Flousy dashboard

The owner console is available at `/flousy/dashboard`. It is intentionally not linked from the public Flousy page.

## Connect the live project

1. Copy `.env.example` to `.env.local` and fill it with the Firebase web-app config for the `flousy-6a153` project.
2. Create the owner account in Firebase Authentication (email/password), or use the existing account if it is already listed there.
3. Set `VITE_FLOUSY_OWNER_UID` in `.env.local` to that account's Firebase Auth UID.
4. Create `admin_users/{uid}` in Firestore using the Firebase Console or Admin SDK with exactly `{ "role": "owner" }`.
5. Deploy the Flousy functions and rules from the Flousy repo:

   `firebase deploy --only functions,firestore:rules,firestore:indexes`

The app writes privacy-safe events through `trackAnalyticsEvent`. Existing in-app feedback is mirrored into `feedback_inbox` by `mirrorFlousyFeedback`. Feedback text is visible only to an approved dashboard account.

## Event contract

`store_visit`, `install`, `sign_up_started`, `sign_up_completed`, `money_setup_started`, `money_setup_completed`, `first_transaction_added`, `first_plan_generated`, `sms_permission_viewed`, `sms_permission_accepted`, `referral_shared`, `referral_activated`, `day_1_return`, and `day_7_return` are reserved names. Referral events are present in the contract but are not emitted until the referral feature exists.

The dashboard runs on seeded preview data when Firebase env vars or admin access are not available, so the interface can be reviewed safely before production telemetry is connected. In a configured build, only the Auth UID in `VITE_FLOUSY_OWNER_UID` and the matching Firestore owner document can access live data.
