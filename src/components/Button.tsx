'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

export function Button({
  onClick,
  disabled,
  loading,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
}: ButtonProps) {
  const baseClasses = 'font-medium transition rounded-lg flex items-center justify-center space-x-2'

  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? <span className="animate-spin">⟳</span> : null}
      {children}
    </button>
  )
}
