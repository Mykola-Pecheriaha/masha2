import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const bucket = body.bucket ?? 'public'
    const path = body.path
    const expiresIn = typeof body.expiresIn === 'number' ? body.expiresIn : 60

    if (!path)
      return NextResponse.json({ error: 'Missing path' }, { status: 400 })

    const admin = createAdminClient()
    const { data, error } = await admin.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn)
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ signedUrl: data.signedUrl })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? String(err) },
      { status: 500 },
    )
  }
}
