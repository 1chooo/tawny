'use client'

import { useParams } from 'next/navigation'
import { MemberDetail } from '@/components/desk/views/member-detail'

export default function MemberPage() {
  const params = useParams<{ id: string }>()
  return <MemberDetail key={params.id} id={params.id} />
}
