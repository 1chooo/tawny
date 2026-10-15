import Image from 'next/image'
import { photos } from '@/lib/vcard/showcase'

export function VcardPhotos() {
  return (
    <div className="vcard-photos">
      {photos.map((photo) => (
        <figure key={photo.title} className="vcard-photo">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="176px"
          />
          <figcaption className="vcard-photo-caption">{photo.title}</figcaption>
        </figure>
      ))}
    </div>
  )
}
