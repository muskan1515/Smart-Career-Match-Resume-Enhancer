'use client'
import { useGlobal } from '@/hooks/useGlobal'
import React, { useEffect } from 'react'

const colors = {
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800'
}

const GlobalMessage = () => {
  const { message, messageType, clearMessage } = useGlobal()

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  if (!message || !messageType) return null

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg ${colors[messageType]} border`}
    >
      {message}
    </div>
  )
}

export default GlobalMessage
