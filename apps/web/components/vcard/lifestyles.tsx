import { Camera, Pencil } from 'lucide-react'
import { lifestyles } from '@/lib/vcard/showcase'

const ICONS = {
  pencil: Pencil,
  camera: Camera,
} as const

export function VcardLifestyles() {
  return (
    <ul className="vcard-lifestyles">
      {lifestyles.map((item) => {
        const Icon = ICONS[item.icon]
        return (
          <li key={item.title} className="vcard-lifestyle vcard-gradient-card">
            <span className="vcard-lifestyle-icon">
              <Icon size={22} aria-hidden="true" />
            </span>
            <div>
              <h3 className="vcard-lifestyle-title">{item.title}</h3>
              <p className="vcard-lifestyle-text">{item.text}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
