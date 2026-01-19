'use client'

import { useEffect, useState } from 'react'

export function useAuthSession() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('/api/user', {
          credentials: 'include',
        })
        if (response.ok) {
          const data = await response.json()
          setUser(data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  return { user, loading }
}
