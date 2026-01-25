/*
  # Create inquiries table for contact form

  1. New Tables
    - `inquiries`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text)
      - `company` (text)
      - `product_interest` (text)
      - `message` (text, required)
      - `created_at` (timestamptz, default now)
  
  2. Security
    - Enable RLS on `inquiries` table
    - Add policy for inserting inquiries (public access for form submission)
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  product_interest text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit inquiries"
  ON inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);