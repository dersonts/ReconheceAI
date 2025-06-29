import React from 'react'
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../utils/cn'

interface MetricCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export default function MetricCard({ title, value, icon: Icon, trend, className }: MetricCardProps) {
  return (
    <div className={cn('card', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className={cn('text-sm font-medium', className?.includes('text-white') ? 'text-white/80' : 'text-gray-600')}>
            {title}
          </p>
          <p className={cn('text-3xl font-bold', className?.includes('text-white') ? 'text-white' : 'text-gray-900')}>
            {value}
          </p>
          {trend && (
            <div className={cn('flex items-center mt-2 text-sm', 
              trend.isPositive 
                ? (className?.includes('text-white') ? 'text-white/90' : 'text-success-600')
                : (className?.includes('text-white') ? 'text-white/90' : 'text-danger-600')
            )}>
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {trend.value}% vs mês anterior
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-lg', 
          className?.includes('text-white') 
            ? 'bg-white/20' 
            : 'bg-gray-100'
        )}>
          <Icon className={cn('h-6 w-6', 
            className?.includes('text-white') ? 'text-white' : 'text-gray-600'
          )} />
        </div>
      </div>
    </div>
  )
}