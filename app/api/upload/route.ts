import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? ''
  const admin = createAdminClient()
  const bucket = 'public'

  // JSON mode — request { filename, path?, useSignedUpload? }
  if (contentType.includes('application/json')) {
    try {
      const { filename, path, useSignedUpload } = await request.json()
      if (!filename)
        return NextResponse.json({ error: 'Missing filename' }, { status: 400 })

      const finalPath = path ?? `${randomUUID()}-${filename}`

      if (useSignedUpload) {
        const { data, error } = await admin.storage
          .from(bucket)
          .createSignedUploadUrl(finalPath)
        if (error)
          return NextResponse.json({ error: error.message }, { status: 500 })
        return NextResponse.json({ uploadUrl: data.signedUrl, path: finalPath })
      }

      return NextResponse.json({ path: finalPath })
    } catch (err: any) {
      return NextResponse.json(
        { error: err?.message ?? String(err) },
        { status: 500 },
      )
    }
  }

  // multipart/form-data mode — form field 'file'
  if (contentType.includes('multipart/form-data')) {
    try {
      const form = await request.formData()
      const file = form.get('file') as File | null
      if (!file)
        return NextResponse.json(
          { error: 'No file field provided' },
          { status: 400 },
        )

      const filenameField =
        (form.get('filename') as string) ??
        (file as any).name ??
        `upload-${Date.now()}`
      const finalPath = `${randomUUID()}-${filenameField}`

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const { error } = await admin.storage
        .from(bucket)
        .upload(finalPath, buffer, { upsert: true })
      if (error)
        return NextResponse.json({ error: error.message }, { status: 500 })

      const { data } = admin.storage.from(bucket).getPublicUrl(finalPath)
      return NextResponse.json({
        path: finalPath,
        publicUrl: data?.publicUrl ?? null,
      })
    } catch (err: any) {
      return NextResponse.json(
        { error: err?.message ?? String(err) },
        { status: 500 },
      )
    }
  }

  return NextResponse.json(
    { error: 'Unsupported content type' },
    { status: 400 },
  )
}
