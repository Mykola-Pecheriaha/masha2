'use client'

import Image from 'next/image'
import { useState } from 'react'
import Container from './Container'

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
          onLoad={() => setLoaded(true)}
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
    <section className="w-full py-16 bg-background" id="portfolio">
      <Container narrow>
        <h2 className="text-3xl font-semibold text-foreground mb-2 text-balance">
          Фотогалерея
        </h2>
        <p className="text-muted-foreground mb-10 text-base leading-relaxed">
          Моменти з операційної зали та медичної практики
        </p>

        <div className="masonry">
          {photos.map((photo, i) => (
            <PhotoCard key={`p-${i}`} photo={photo} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
