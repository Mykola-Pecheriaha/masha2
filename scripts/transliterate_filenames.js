const fs = require('fs')
const path = require('path')

const dir = path.join(process.cwd(), 'public', 'photos')
if (!fs.existsSync(dir)) {
  console.error('photos directory not found:', dir)
  process.exit(1)
}

const map = {}

const cyrillic = /[^\x00-\x7F]/

const translitMap = {
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

function translit(str) {
  return str
    .split('')
    .map((ch) => (translitMap[ch] !== undefined ? translitMap[ch] : ch))
    .join('')
}

const files = fs.readdirSync(dir).filter(Boolean)
for (const file of files) {
  if (!cyrillic.test(file)) continue
  const ext = path.extname(file)
  const base = path.basename(file, ext)
  let t = translit(base)
  // normalize: replace spaces and undesirable chars with -
  t = t.replace(/[^a-zA-Z0-9.-]+/g, '-')
  t = t.replace(/-+/g, '-')
  t = t.replace(/^-|-$/g, '')
  let candidate = `${t}${ext}`
  let i = 1
  while (fs.existsSync(path.join(dir, candidate))) {
    candidate = `${t}-${i}${ext}`
    i++
  }
  fs.renameSync(path.join(dir, file), path.join(dir, candidate))
  map[file] = candidate
}

fs.writeFileSync(
  path.join(process.cwd(), 'scripts', 'rename_map.json'),
  JSON.stringify(map, null, 2),
)
console.log('written scripts/rename_map.json')
