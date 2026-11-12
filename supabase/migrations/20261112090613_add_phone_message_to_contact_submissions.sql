/*
# Add phone and message columns to contact submissions

1. Modified Tables
- `contact_submissions`
  - Add `phone` (text, optional) so the website form's phone number field can be stored.
  - Add `message` (text, optional) so the website form's optional message field can be stored.

2. Security
- No policy changes: the table keeps row level security with insert-only access for visitors.
- No new grants needed; the existing INSERT grant covers the new columns.

3. Notes
- Columns are nullable so older rows and any integrations that omit them keep working.
- Length limits are enforced with CHECK constraints as a backstop to client-side validation.
*/

ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS phone text CHECK (phone IS NULL OR char_length(phone) <= 32),
  ADD COLUMN IF NOT EXISTS message text CHECK (message IS NULL OR char_length(message) <= 5000);
