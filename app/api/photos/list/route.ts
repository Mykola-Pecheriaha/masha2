import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'

export async function GET() {
  try {
    const admin = createAdminClient()
    // list files in the public bucket
    const { data, error } = await admin.storage
      .from('public')
      .list('', { limit: 1000 })
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 })

    const files = (data || []).map((f: any) => {
      const publicUrl = admin.storage.from('public').getPublicUrl(f.name)
        .data?.publicUrl
      return { name: f.name, size: f.size, updated_at: f.updated_at, publicUrl }
    })

    return NextResponse.json({ files })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? String(err) },
      { status: 500 },
    )
  }
}
