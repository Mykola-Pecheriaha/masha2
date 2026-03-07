const fs = require('fs')
const path = require('path')
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

async function main() {
  const dir = path.join(process.cwd(), 'public', 'photos')
  if (!fs.existsSync(dir)) {
    console.error('photos directory not found:', dir)
    process.exit(3)
  }
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(f))
  const results = []
  for (const file of files) {
    const full = path.join(dir, file)
    const buffer = fs.readFileSync(full)
    try {
      const { data, error } = await admin.storage
        .from('public')
        .upload(file, buffer, { upsert: true })
      if (error) {
        results.push({ file, status: 'error', error: error.message })
      } else {
        results.push({ file, status: 'uploaded' })
      }
    } catch (err) {
      results.push({
        file,
        status: 'error',
        error: err?.message || String(err),
      })
    }
  }
  console.log(JSON.stringify({ results }, null, 2))
}

main()
