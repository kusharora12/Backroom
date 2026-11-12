/*
# Make details column optional on contact submissions

1. Modified Tables
- `contact_submissions`
  - Relax the `details` column from NOT NULL to nullable. The website form treats
    the message as optional, so rows with no message previously failed the table's
    NOT NULL constraint and the submission was rejected. The form now stores its
    optional message in the dedicated `message` column (added in an earlier
    migration) and no longer writes to `details`; existing rows are unaffected.

2. Security
- No changes: row level security stays enabled with insert-only access for
  visitors, exactly as before.

3. Notes
- This is a nullable change only — no data is dropped or modified.
*/

ALTER TABLE contact_submissions
  ALTER COLUMN details DROP NOT NULL;
