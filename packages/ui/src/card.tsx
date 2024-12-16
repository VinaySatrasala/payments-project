import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div 
      className={`
        rounded-lg border border-neutral-800 bg-neutral-900 p-6
        transition-all hover:border-neutral-700 hover:bg-neutral-900/80
        ${className}
      `}
    >
      {children}
    </div>
  )
}

