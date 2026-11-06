/*
# Create contact submissions table

1. New Tables
- `contact_submissions`: stores enquiries from the website contact form.
  - `id` (uuid, primary key)
  - `name`, `email`, `company`, `service`, `budget`, `details` (text)
  - `created_at` (timestamptz)

2. Security
- Row level security enabled.
- Visitors (anon role) may only INSERT new enquiries. They cannot read, edit or delete any submissions.
- No SELECT grant is given, so submissions are only viewable from the Supabase dashboard.

3. Notes
- Length limits are enforced with CHECK constraints as a backstop to client-side validation.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
  company text CHECK (company IS NULL OR char_length(company) <= 160),
  service text CHECK (service IS NULL OR char_length(service) <= 80),
  budget text CHECK (budget IS NULL OR char_length(budget) <= 80),
  details text NOT NULL CHECK (char_length(details) BETWEEN 1 AND 5000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_submissions TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions" ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
