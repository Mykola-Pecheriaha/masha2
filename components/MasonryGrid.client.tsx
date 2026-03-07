'use client'

import Image from 'next/image'
import { useState } from 'react'

export type MasonryPhoto = {
  src: string
  alt: string
  width: number
  height: number
}

type Props = {
  photos: MasonryPhoto[]
}

function PhotoCard({ photo, index }: { photo: MasonryPhoto; index: number }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="masonry-item relative overflow-hidden rounded-sm bg-muted group cursor-pointer">
      <div
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          onLoadingComplete={() => setLoaded(true)}
          priority={index < 3}
        />
      </div>

      {!loaded && (
        <div
          className="bg-muted animate-pulse"
          style={{ paddingBottom: `${(photo.height / photo.width) * 100}%` }}
        />
      )}

      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
    </div>
  )
}

export default function MasonryGridClient({ photos }: Props) {
  return (
    // Only render the grid itself; the surrounding section and headings are
    // provided by the parent page to avoid duplicate ids and headings.
    <div className="masonry">
      {photos.map((photo, i) => (
        <PhotoCard key={`p-${i}-${photo.src}`} photo={photo} index={i} />
      ))}
    </div>
  )
}
