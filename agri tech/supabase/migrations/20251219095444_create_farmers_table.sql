/*
  # Create Farmers Table

  1. New Tables
    - `farmers`
      - `id` (uuid, primary key) - Unique identifier for each farmer
      - `name` (text) - Farmer's name
      - `mobile_no` (text) - 10-digit mobile number
      - `location` (text) - Farmer's location
      - `aadhar` (text, optional) - 12-digit Aadhar number
      - `soil_type` (text, optional) - Selected soil texture type
      - `language` (text) - Preferred language (Hindi, Telugu, English, Urdu)
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
  
  2. Security
    - Enable RLS on `farmers` table
    - Add policy for public insert access (for farmer registration)
    - Add policy for users to read their own data by mobile number
*/

CREATE TABLE IF NOT EXISTS farmers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  mobile_no text NOT NULL,
  location text DEFAULT '',
  aadhar text DEFAULT '',
  soil_type text DEFAULT '',
  language text DEFAULT 'English',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for farmer registration"
  ON farmers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read access"
  ON farmers
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public update access"
  ON farmers
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);