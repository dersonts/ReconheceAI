import React from 'react'
import { cn } from '../../utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export default function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  return (
    <div className={cn(
      'bg-white rounded-xl shadow-sm border border-gray-200',
      hover && 'hover:shadow-lg transition-shadow duration-200',
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  )
}