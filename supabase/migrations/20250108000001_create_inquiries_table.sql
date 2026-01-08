-- Create inquiries table for storing form submissions
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  score INTEGER,
  form_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for common queries
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_service_type ON inquiries(service_type);

-- Enable Row Level Security
-- No policies = no access via public API (anon/authenticated)
-- Service role key (used in API routes) bypasses RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Add comment for documentation
COMMENT ON TABLE inquiries IS 'Stores inquiry form submissions from the website';
