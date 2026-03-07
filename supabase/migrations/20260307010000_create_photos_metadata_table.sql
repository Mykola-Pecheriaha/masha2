-- Migration: create photos_metadata table
-- Generated: 2026-03-07

CREATE TABLE IF NOT EXISTS public.photos_metadata (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  filename text NOT NULL UNIQUE,
  description text,
  owner uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  is_public boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS photos_metadata_created_at_idx
  ON public.photos_metadata(created_at);

CREATE INDEX IF NOT EXISTS photos_metadata_title_idx
  ON public.photos_metadata(title);
