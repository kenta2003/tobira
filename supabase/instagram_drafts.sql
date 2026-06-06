-- Instagram drafts table
-- Run this in the Supabase SQL editor

CREATE TABLE IF NOT EXISTS instagram_drafts (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),

  -- Theme identification
  theme_type          text NOT NULL CHECK (theme_type IN ('regional','seasonal','category','access')),
  theme_key           text NOT NULL,
  theme_title_ja      text NOT NULL,
  theme_title_en      text NOT NULL,

  -- Content type
  content_type        text NOT NULL DEFAULT 'carousel'
                      CHECK (content_type IN ('carousel','story_draft')),

  -- Spot references (carousel order preserved)
  spot_ids            text[] NOT NULL DEFAULT '{}',

  -- Slide data: [{spot_id, image_url, slide_caption, order}]
  slide_data          jsonb NOT NULL DEFAULT '[]',

  -- Post text and hashtags (separated)
  caption             text NOT NULL DEFAULT '',
  hashtags            text[] NOT NULL DEFAULT '{}',

  -- Status
  status              text NOT NULL DEFAULT 'draft'
                      CHECK (status IN ('draft','approved','published','failed')),
  error_message       text,
  retry_count         smallint NOT NULL DEFAULT 0,

  -- Instagram Graph API
  ig_media_id         text,
  ig_permalink        text,
  published_at        timestamptz,

  -- Insights (fetched ~24h after publish)
  insights_fetched_at timestamptz,
  likes_count         integer,
  comments_count      integer,
  reach               integer,
  impressions         integer,

  -- Scheduling and approval
  scheduled_for       timestamptz,
  approved_by         text,
  approved_at         timestamptz
);

-- updated_at auto-update trigger
CREATE OR REPLACE FUNCTION update_instagram_drafts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_instagram_drafts_updated_at
  BEFORE UPDATE ON instagram_drafts
  FOR EACH ROW EXECUTE FUNCTION update_instagram_drafts_updated_at();

CREATE INDEX IF NOT EXISTS idx_ig_drafts_status ON instagram_drafts (status);
CREATE INDEX IF NOT EXISTS idx_ig_drafts_theme_key ON instagram_drafts (theme_key);
CREATE INDEX IF NOT EXISTS idx_ig_drafts_scheduled ON instagram_drafts (scheduled_for)
  WHERE status = 'approved';
