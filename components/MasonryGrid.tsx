import fs from 'fs'
import path from 'path'
import MasonryGridClient, { MasonryPhoto } from './MasonryGrid.client'
import defaultPhotos, { loadPhotos } from './ui/masonry-grid'

export default async function MasonryGrid() {
  // Try to load current files from Supabase bucket first (server)
  try {
    const remote = await loadPhotos()
    if (remote && remote.length > 0) {
      const photos: MasonryPhoto[] = remote.map((p) => ({
        src: p.src,
        alt: p.alt,
        width: 800,
        height: 600,
      }))
      return <MasonryGridClient photos={photos} />
    }
  } catch (e) {
    // ignore and fallback to local files
  }

  // Fallback: read local public/photos
  const dir = path.join(process.cwd(), 'public', 'photos')
  let files: string[] = []

  try {
    files = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(f))
  } catch (e) {
    files = []
  }

  const photos: MasonryPhoto[] = files.map((f) => ({
    src: `/photos/${f}`,
    alt: f.replace(/[-_]/g, ' '),
    width: 800,
    height: 600,
  }))

  // If still empty, show sample images
  if (photos.length === 0) {
    const samplePhotos: MasonryPhoto[] = [1, 2, 3, 4, 5, 6].map((i) => ({
      src: `https://picsum.photos/seed/masha${i}/800/${i % 2 === 0 ? 1200 : 600}`,
      alt: `Прикладове зображення ${i}`,
      width: 800,
      height: i % 2 === 0 ? 1200 : 600,
    }))

    return (
      <div>
        <div className="py-4 text-center text-sm text-gray-600">
          Показано прикладові зображення (щоб використовувати локальні — додайте
          файли у public/photos або завантажте в бакет).
        </div>
        <MasonryGridClient photos={samplePhotos} />
      </div>
    )
  }

  return <MasonryGridClient photos={photos} />
}
