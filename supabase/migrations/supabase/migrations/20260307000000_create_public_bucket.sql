-- Migration: create public storage bucket
-- Creates a public bucket named 'public' if it does not already exist.

-- Migration: create public storage bucket
-- Creates a public bucket named 'public' if it does not already exist.

insert into storage.buckets (id, name, public)
values ('public', 'public', true)
on conflict (id) do nothing;
