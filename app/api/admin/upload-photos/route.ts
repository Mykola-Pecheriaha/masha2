import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'

export async function POST(_req: NextRequest) {
  try {
    const admin = createAdminClient()
    const bucket = 'public'

    // Ensure bucket exists
    try {
      // createBucket may fail if already exists
      // @ts-ignore
      const { data: createData, error: createErr } =
        await admin.storage.createBucket(bucket, { public: true })
      if (createErr && !/already exists/i.test(String(createErr.message))) {
        // continue — we'll try uploads but report error
      }
    } catch (e) {
      // ignore — bucket may already exist or method not supported
    }

    const dir = path.join(process.cwd(), 'public', 'photos')
    if (!fs.existsSync(dir))
      return NextResponse.json(
        { error: 'photos directory not found' },
        { status: 400 },
      )

    const files = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(f))
    const results: Array<{ file: string; status: string; error?: string }> = []

    for (const file of files) {
      const full = path.join(dir, file)
      const buffer = fs.readFileSync(full)
      try {
        const { data, error } = await admin.storage
          .from(bucket)
          .upload(file, buffer, { upsert: true })
        if (error) {
          results.push({ file, status: 'error', error: error.message })
        } else {
          results.push({ file, status: 'uploaded' })
        }
      } catch (err: any) {
        results.push({
          file,
          status: 'error',
          error: err?.message ?? String(err),
        })
      }
    }

    return NextResponse.json({ results })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? String(err) },
      { status: 500 },
    )
  }
}
