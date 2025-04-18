import { usePage, router } from '@inertiajs/react'
import { useEffect } from 'react'

export default function useAdminOnly() {
  const { auth } = usePage().props
  const user = auth?.user
  console.log(user.role)

  useEffect(() => {
    if (!user) return // wait until user is available

    if (user.role !== 1) {
      router.visit('/unauthorized') // Redirect non-admin
    }
  }, [user])
}
