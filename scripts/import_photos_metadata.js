const { createClient } = require('@supabase/supabase-js')

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error(
    'Missing env vars NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY',
  )
  process.exit(2)
}

const admin = createClient(url, key, {
  global: { headers: { 'x-supabase-admin': '1' } },
})

function titleFromFilename(name) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\.[^.]+$/, '')
    .trim()
}

async function main() {
  try {
    const bucket = 'public'
    const { data: files, error } = await admin.storage
      .from(bucket)
      .list('', { limit: 2000 })
    if (error) throw error
    if (!Array.isArray(files) || files.length === 0) {
      console.log('No files found in bucket', bucket)
      return
    }

    const rows = files
      .filter(
        (f) =>
          typeof f?.name === 'string' &&
          /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(f.name),
      )
      .map((f) => ({
        title: titleFromFilename(f.name),
        filename: f.name,
        description: null,
        owner: null,
        is_public: true,
      }))

    if (rows.length === 0) {
      console.log('No image files to import')
      return
    }

    // Upsert by filename to avoid duplicates
    const { data, error: insertErr } = await admin
      .from('photos_metadata')
      .upsert(rows, { onConflict: 'filename' })

    if (insertErr) {
      console.error('Insert error:', insertErr.message || insertErr)
      process.exit(3)
    }

    console.log(`Imported ${rows.length} rows into photos_metadata`)
    console.log(JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('Error:', err?.message || String(err))
    process.exit(4)
  }
}

if (require.main === module) main()

module.exports = { main }
