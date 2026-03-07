const { createClient } = require('@supabase/supabase-js')

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing env vars')
  process.exit(2)
}

const admin = createClient(url, key, {
  global: { headers: { 'x-supabase-admin': '1' } },
})

async function main() {
  try {
    const res = await admin.storage.createBucket('public', { public: true })
    console.log('create:', JSON.stringify(res, null, 2))
  } catch (e) {
    console.error('error:', e.message || e)
    process.exit(1)
  }
}

main()
