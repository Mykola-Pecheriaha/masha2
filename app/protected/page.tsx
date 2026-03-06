import { redirect } from 'next/navigation'

import { LogoutButton } from '@/components/logout-button'
import { createClient } from '@/lib/server'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  const claims = data.claims
  const name =
    (claims['name'] as string) ??
    (claims['user_metadata']?.full_name as string) ??
    'mykola'
  const email = (claims['email'] as string) ?? 'pecheryag@gmail.com'

  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="rounded-lg border p-6 text-center">
          <p className="mb-4 text-lg">Hello {name},</p>
          <p className="mb-6 text-sm text-muted-foreground">{email}</p>
          <div className="flex justify-center">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}
