# Student Hub setup

The hub uses a separate Firebase project from Flousy.

## Web app

1. Create a Firebase project for the Student Hub.
2. Enable Email/Password authentication.
3. Register a web app and copy its values into `.env.local` using the `VITE_HUB_FIREBASE_*` names from `.env.example`.
4. Create the first teacher document at `hub_teachers/<your-auth-uid>`:

```json
{ "role": "teacher", "name": "Mahmoud" }
```

## Functions

From `hub-functions`, install dependencies and deploy the callable account-creation function to the same Firebase project. It verifies the caller against `hub_teachers` before creating a student account.

Cloud Functions require the Firebase project to use the Blaze plan because Firebase must enable Cloud Build and Artifact Registry.

```powershell
npm install
npm run deploy
```

The frontend calls the deployed function as `createHubStudent`.

## First teacher

After signing up your own Firebase account, create this document in Firestore:

```text
hub_teachers/ONm43id8YgOFon8lVWMRMHcGqBs2
```

```json
{ "role": "teacher", "name": "Mahmoud" }
```

## Firestore

Deploy `firestore.rules` with the Firebase CLI. The rules separate teacher documents, student profiles, assignments, and submissions. Students can submit only as themselves; teacher access is based on the `hub_teachers` role document.

## Python execution

The browser IDE loads Pyodide from the official CDN and runs standard-library Python inside a Web Worker. Each run has a five-second timeout. Code is not sent to the website server for execution.
