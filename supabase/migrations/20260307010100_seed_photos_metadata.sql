-- Migration: seed photos_metadata with sample rows
-- Generated: 2026-03-07

INSERT INTO public.photos_metadata (title, filename, description, owner, is_public)
VALUES
  ('Sample Photo 1', 'sample-1.jpg', 'Test seed photo #1', NULL, true),
  ('Sample Photo 2', 'sample-2.jpg', 'Test seed photo #2', NULL, true),
  ('Uploaded IMG 20240211', 'IMG-20240211-110210.jpg', 'User uploaded photo', NULL, true);
