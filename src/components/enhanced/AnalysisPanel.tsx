import React, { useState } from 'react'
import { Brain, AlertTriangle, Target, Award, Sparkles, TrendingUp, Users, DollarSign, GraduationCap } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import LoadingSpinner from '../ui/LoadingSpinner'

interface AnalysisPanelProps {
  analysis: string
  analysisType: 'risk' | 'impact' | 'recognition' | 'development' | 'diversity'
  loading: boolean
  onAnalyze: (type: 'risk' | 'impact' | 'recognition' | 'development' | 'diversity') => void
}

export default function AnalysisPanel({ analysis, analysisType, loading, onAnalyze }: AnalysisPanelProps) {
  const analysisTypes = [
    {
      type: 'risk' as const,
      label: 'Análise de Risco de Saída',
      icon: AlertTriangle,
      color: 'danger',
      description: 'Avalia probabilidade de saída e estratégias de retenção baseadas em dados comportamentais e performance'
    },
    {
      type: 'impact' as const,
      label: 'Análise de Impacto da Perda',
      icon: Target,
      color: 'warning',
      description: 'Quantifica o impacto organizacional da potencial saída do colaborador nos projetos e equipe'
    },
    {
      type: 'recognition' as const,
      label: 'Plano de Reconhecimento',
      icon: Award,
      color: 'success',
      description: 'Gera estratégias personalizadas de reconhecimento baseadas no perfil e contribuições do colaborador'
    },
    {
      type: 'development' as const,
      label: 'Plano de Desenvolvimento',
      icon: TrendingUp,
      color: 'primary',
      description: 'Cria trilha de crescimento personalizada com base em competências atuais e potencial identificado'
    },
    {
      type: 'diversity' as const,
      label: 'Análise de Diversidade',
      icon: Users,
      color: 'info',
      description: 'Avalia contribuição para diversidade organizacional e oportunidades de inclusão'
    }
  ]

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Brain className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Análise Inteligente com IA Generativa</h3>
            <p className="text-sm text-gray-600">Sistema avançado de análise comportamental e preditiva</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Sparkles className="h-4 w-4 text-primary-500" />
          <span className="text-xs text-primary-600 font-medium">Powered by AI</span>
        </div>
      </div>

      {/* Analysis Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {analysisTypes.map((type) => {
          const Icon = type.icon
          const isActive = analysisType === type.type
          
          return (
            <button
              key={type.type}
              onClick={() => onAnalyze(type.type)}
              disabled={loading}
              className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                isActive
                  ? `border-${type.color}-200 bg-${type.color}-50 shadow-sm`
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  isActive ? `bg-${type.color}-100` : 'bg-gray-100'
                }`}>
                  <Icon className={`h-5 w-5 ${
                    isActive ? `text-${type.color}-600` : 'text-gray-400'
                  }`} />
                </div>
                <span className={`font-medium text-sm ${
                  isActive ? `text-${type.color}-900` : 'text-gray-700'
                }`}>
                  {type.label}
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${
                isActive ? `text-${type.color}-700` : 'text-gray-500'
              }`}>
                {type.description}
              </p>
            </button>
          )
        })}
      </div>

      {/* Analysis Content */}
      <div className="min-h-[600px] bg-gray-50 rounded-lg p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <LoadingSpinner size="lg" className="mx-auto mb-4" />
              <p className="text-gray-600 mb-2 font-medium">Gerando análise inteligente...</p>
              <p className="text-sm text-gray-500">Processando dados comportamentais e de performance</p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        ) : analysis ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
              <span className="text-sm text-success-600 font-medium">Análise concluída com sucesso</span>
              <span className="text-xs text-gray-500">• Baseada em dados reais do colaborador</span>
            </div>
            
            {/* Analysis Header */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3 mb-2">
                {(() => {
                  const currentType = analysisTypes.find(t => t.type === analysisType)
                  const Icon = currentType?.icon || Brain
                  return (
                    <>
                      <Icon className={`h-5 w-5 text-${currentType?.color || 'primary'}-600`} />
                      <h4 className="font-semibold text-gray-900">{currentType?.label}</h4>
                    </>
                  )
                })()}
              </div>
              <p className="text-sm text-gray-600">
                {analysisTypes.find(t => t.type === analysisType)?.description}
              </p>
            </div>
            
            {/* Analysis Content */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div 
                className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: analysis }}
              />
            </div>

            {/* Analysis Footer */}
            <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
              <div className="flex items-start space-x-3">
                <Brain className="h-5 w-5 text-primary-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-primary-900 mb-1">Sobre esta Análise</h5>
                  <p className="text-sm text-primary-700">
                    Esta análise foi gerada por IA avançada considerando todos os dados disponíveis do colaborador, 
                    incluindo performance, histórico, sentimento, absenteísmo e fatores de risco. 
                    As recomendações são baseadas em padrões identificados e melhores práticas de RH.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <Brain className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h4 className="text-lg font-medium text-gray-700 mb-2">Sistema de Análise Avançado</h4>
              <p className="text-gray-500 mb-4">Selecione um tipo de análise para começar</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 max-w-md">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Análise de Risco</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>Impacto da Perda</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span>Reconhecimento</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Desenvolvimento</span>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-primary-600 mt-6">
                <Sparkles className="h-4 w-4" />
                <span>IA com dados completos dos colaboradores</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}