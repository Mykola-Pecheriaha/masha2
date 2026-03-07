const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

function translit(str) {
  const map = {
    А: 'A',
    а: 'a',
    Б: 'B',
    б: 'b',
    В: 'V',
    в: 'v',
    Г: 'H',
    г: 'h',
    Ґ: 'G',
    ґ: 'g',
    Д: 'D',
    д: 'd',
    Е: 'E',
    е: 'e',
    Є: 'Ye',
    є: 'ie',
    Ж: 'Zh',
    ж: 'zh',
    З: 'Z',
    з: 'z',
    И: 'Y',
    и: 'y',
    І: 'I',
    і: 'i',
    Ї: 'Yi',
    ї: 'i',
    Й: 'Y',
    й: 'i',
    К: 'K',
    к: 'k',
    Л: 'L',
    л: 'l',
    М: 'M',
    м: 'm',
    Н: 'N',
    н: 'n',
    О: 'O',
    о: 'o',
    П: 'P',
    п: 'p',
    Р: 'R',
    р: 'r',
    С: 'S',
    с: 's',
    Т: 'T',
    т: 't',
    У: 'U',
    у: 'u',
    Ф: 'F',
    ф: 'f',
    Х: 'Kh',
    х: 'kh',
    Ц: 'Ts',
    ц: 'ts',
    Ч: 'Ch',
    ч: 'ch',
    Ш: 'Sh',
    ш: 'sh',
    Щ: 'Shch',
    щ: 'shch',
    Ь: '',
    ь: '',
    Ю: 'Yu',
    ю: 'iu',
    Я: 'Ya',
    я: 'ia',
  }
  return str
    .split('')
    .map((ch) => (map[ch] !== undefined ? map[ch] : ch))
    .join('')
}

async function main() {
  const src = process.argv[2]
  let dest = process.argv[3]
  if (!src) {
    console.error(
      'Usage: node scripts/upload_file.js <source-path> [dest-filename]',
    )
    process.exit(2)
  }
  if (!fs.existsSync(src)) {
    console.error('Source file not found:', src)
    process.exit(3)
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env',
    )
    process.exit(4)
  }

  const admin = createClient(url, key, {
    global: { headers: { 'x-supabase-admin': '1' } },
  })

  const buffer = fs.readFileSync(src)
  if (!dest) dest = path.basename(src)
  // transliterate dest to ASCII-safe
  const ext = path.extname(dest)
  const base = path.basename(dest, ext)
  let safe = translit(base)
  safe = safe.replace(/[^a-zA-Z0-9.-]+/g, '-')
  safe = safe.replace(/-+/g, '-')
  safe = safe.replace(/^-|-$/g, '')
  const finalName = `${safe}${ext}`

  console.log('Uploading', src, '->', finalName)
  try {
    const { data, error } = await admin.storage
      .from('public')
      .upload(finalName, buffer, { upsert: true })
    if (error) {
      console.error('Upload error:', error.message || error)
      process.exit(1)
    }
    const publicUrl = admin.storage.from('public').getPublicUrl(finalName)
      .data?.publicUrl
    console.log('Uploaded:', finalName)
    console.log('Public URL:', publicUrl)
  } catch (e) {
    console.error('Exception:', e?.message || e)
    process.exit(1)
  }
}

main()
