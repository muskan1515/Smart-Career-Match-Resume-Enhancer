'use client'
import { useGlobal } from '@/hooks/useGlobal'
import React from 'react'

const Loader = () => {
  const { loading } = useGlobal()

  if (!loading) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader
