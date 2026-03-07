export type PhotoExpanded = {
  id: string
  src: string
  alt: string
  className?: string
}

// Explicit list of photos located in public/photos
const filenames = [
  'zobrazhennia-viber-2025-12-31-12-19-25-479.jpg',
  'zobrazhennia-viber-2025-12-31-12-19-25-745.jpg',
  'zobrazhennia-viber-2025-12-31-12-19-25-925.jpg',
  'zobrazhennia-viber-2026-01-01-12-11-02-768.jpg',
  'zobrazhennia-viber-2026-01-01-12-11-03-239.jpg',
  'zobrazhennia-viber-2026-01-01-12-11-03-249.jpg',
  'zobrazhennia-viber-2026-01-01-12-11-03-896.jpg',
  'zobrazhennia-viber-2026-01-01-12-11-03-905.jpg',
  'zobrazhennia-viber-2026-01-01-12-11-03-923.jpg',
  'zobrazhennia-viber-2026-01-01-12-11-04-569.jpg',
  'chirurg10.jpg',
  'department4.jpg',
  'department5.jpg',
  'IMG-0cb7f82af1a4794f78ad36a739e8355a-V.jpg',
  'IMG-0e78be07320af68872dbd83fc0eeb947-V.jpg',
  'IMG-0f37791ddd89ae9136398131b5f26265-V.jpg',
  'IMG-1e302f7e3be8f0304dab884b1f7c465b-V.jpg',
  'oper2.jpg',
  'surgoper2.jpg',
  'surgoper3.jpg',
  'surgoper4.jpg',
  'surgoper5.jpg',
  'surgoper6.jpg',
  'surgoper7.jpg',
  'surgoper10.jpg',
  'surgoper11.jpg',
  'surgoper12.jpg',
  'surgoper13.jpg',
  'surgoper14.jpg',
  'surgoper15.jpg',
  'surgoper16.jpg',
  'surgoper17.jpg',
  'surgoper18.jpg',
  'surgoper19.jpg',
  'surgoper20.jpg',
  'surgoper21.jpg',
  'surgoper22.jpg',
  'surgoper23.jpg',
  'surgoper24.jpg',
  'surgoper25.jpg',
  'surgoper26.jpg',
  'surgoper27.jpg',
  'surgoper28.jpg',
  'surgoper29.jpg',
  'surgoper30.jpg',
  'surgoper31.jpg',
  'surgoper32.jpg',
  'surgoper33.jpg',
  'surgoper34.jpg',
  'surgoper35.jpg',
  'surgoper36.jpg',
]

export const photos: PhotoExpanded[] = filenames.map((fn) => ({
  id: fn,
  src: `/photos/${fn}`,
  alt: fn.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''),
  className: 'rounded-md shadow-sm',
}))

export default photos

// Server helper: load current files from Supabase `public` bucket.
// Use from server components: `const photos = await loadPhotos()`
export async function loadPhotos(): Promise<PhotoExpanded[]> {
  try {
    // dynamic import so this module remains safe to import from client code
    const { createAdminClient } = await import('@/lib/supabase-admin')
    const admin = createAdminClient()
    const { data, error } = await admin.storage
      .from('public')
      .list('', { limit: 2000 })
    if (error || !Array.isArray(data)) return photos

    return (data as Array<any>)
      .filter(
        (f) =>
          typeof f?.name === 'string' &&
          /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(f.name),
      )
      .map((f) => {
        const name = String(f.name)
        const publicUrl = admin.storage.from('public').getPublicUrl(name)
          .data?.publicUrl
        return {
          id: name,
          src: publicUrl || `/photos/${name}`,
          alt: name.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''),
          className: 'rounded-md shadow-sm',
        }
      })
  } catch (e) {
    return photos
  }
}
