import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  Award,
  Clock,
  Target,
  BarChart3,
  MessageSquare,
  Building,
  DollarSign,
  GraduationCap,
  Globe,
  Shield,
  Users,
  MapPin,
  Briefcase,
  Star,
  Activity,
  FileText,
  Heart,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingDown,
  Eye,
  Edit,
  Download,
  Share2,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Calculator,
  PieChart,
  Brain,
  Sparkles
} from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import AnalysisPanel from '../components/enhanced/AnalysisPanel'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function EmployeeDetail() {
  const { id } = useParams<{ id: string }>()
  const { employees, analyzeEmployee, weightConfig } = useStore()
  const [analysis, setAnalysis] = useState<string>('')
  const [analysisType, setAnalysisType] = useState<'risk' | 'impact' | 'recognition' | 'development' | 'diversity'>('risk')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [salaryAnalysis, setSalaryAnalysis] = useState<{
    currentSalary: number
    suggestedIncrease: number
    newSalary: number
    justification: string
    departmentBudget: number
    budgetImpact: number
  } | null>(null)

  const employee = employees.find(emp => emp.id === parseInt(id || '0'))

  useEffect(() => {
    if (employee) {
      handleAnalyze('risk')
      calculateSalaryRecommendation()
    }
  }, [employee])

  const handleAnalyze = async (type: 'risk' | 'impact' | 'recognition' | 'development' | 'diversity') => {
    if (!employee) return

    setLoading(true)
    setAnalysisType(type)
    
    try {
      const result = await analyzeEmployee(employee.id, type, weightConfig)
      setAnalysis(result)
    } catch (error) {
      toast.error('Erro ao gerar análise')
      console.error('Error analyzing employee:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateSalaryRecommendation = () => {
    if (!employee) return

    // Lógica de cálculo de aumento salarial baseada no score e outros fatores
    const baseIncrease = calculateBaseIncrease(employee)
    const performanceMultiplier = getPerformanceMultiplier(employee)
    const riskMultiplier = getRiskMultiplier(employee)
    const tenureMultiplier = getTenureMultiplier(employee)
    
    const suggestedIncreasePercent = Math.min(
      Math.max(baseIncrease * performanceMultiplier * riskMultiplier * tenureMultiplier, 5), 
      25
    )
    
    const currentSalary = employee.salario
    const suggestedIncrease = (currentSalary * suggestedIncreasePercent) / 100
    const newSalary = currentSalary + suggestedIncrease
    
    // Orçamento departamental (simulado)
    const departmentBudget = getDepartmentBudget(employee.centroCustos)
    const budgetImpact = (suggestedIncrease / departmentBudget) * 100
    
    const justification = generateSalaryJustification(employee, suggestedIncreasePercent)
    
    setSalaryAnalysis({
      currentSalary,
      suggestedIncrease,
      newSalary,
      justification,
      departmentBudget,
      budgetImpact
    })
  }

  const calculateBaseIncrease = (emp: any) => {
    // Base de 10% para todos
    let base = 10
    
    // Ajuste baseado no score
    if (emp.score >= 450) base += 8  // Top performers
    else if (emp.score >= 400) base += 5  // High performers
    else if (emp.score >= 300) base += 2  // Good performers
    else if (emp.score < 250) base -= 3   // Underperformers
    
    return base
  }

  const getPerformanceMultiplier = (emp: any) => {
    const performance = emp.desempenhoTexto?.toLowerCase() || ''
    
    if (performance.includes('excepcional') || performance.includes('excede')) return 1.3
    if (performance.includes('acima do esperado') || performance.includes('excelente')) return 1.2
    if (performance.includes('atende') || performance.includes('bom')) return 1.1
    if (performance.includes('parcialmente')) return 0.9
    if (performance.includes('não atende')) return 0.7
    
    return 1.0
  }

  const getRiskMultiplier = (emp: any) => {
    const risk = emp.riscoPerdaTexto?.toLowerCase() || ''
    
    if (risk === 'alto') return 1.4  // Maior aumento para reter talentos em risco
    if (risk === 'médio') return 1.2
    if (risk === 'baixo') return 1.0
    
    return 1.0
  }

  const getTenureMultiplier = (emp: any) => {
    // Colaboradores com mais tempo merecem reconhecimento
    if (emp.tempoDeCasa >= 10) return 1.2
    if (emp.tempoDeCasa >= 5) return 1.1
    if (emp.tempoDeCasa >= 2) return 1.0
    
    return 0.95  // Novatos recebem menos inicialmente
  }

  const getDepartmentBudget = (centroCustos: string) => {
    // Orçamentos simulados baseados nos dados reais
    const budgets: { [key: string]: number } = {
      'CC101': 1049456,  // Comercial
      'CC105': 1523142,  // Administrativo
    }
    
    return budgets[centroCustos] || 1000000
  }

  const generateSalaryJustification = (emp: any, increasePercent: number) => {
    let justification = `<strong>Análise de Reajuste Salarial para ${emp.nome}</strong><br><br>`
    
    justification += `<strong>Recomendação:</strong> Aumento de ${increasePercent.toFixed(1)}% (${formatCurrency(salaryAnalysis?.suggestedIncrease || 0)})<br><br>`
    
    justification += `<strong>Justificativas:</strong><br>`
    
    // Score-based justification
    if (emp.score >= 450) {
      justification += `• <strong>Performance Excepcional:</strong> Score de ${emp.score.toFixed(1)}/500 coloca o colaborador entre os top performers da empresa<br>`
    } else if (emp.score >= 400) {
      justification += `• <strong>Alta Performance:</strong> Score de ${emp.score.toFixed(1)}/500 demonstra contribuição significativa<br>`
    } else if (emp.score >= 300) {
      justification += `• <strong>Performance Sólida:</strong> Score de ${emp.score.toFixed(1)}/500 indica desempenho consistente<br>`
    }
    
    // Risk-based justification
    if (emp.riscoPerdaTexto?.toLowerCase() === 'alto') {
      justification += `• <strong>Retenção Crítica:</strong> Colaborador classificado como alto risco de saída - aumento estratégico para retenção<br>`
    } else if (emp.riscoPerdaTexto?.toLowerCase() === 'médio') {
      justification += `• <strong>Prevenção de Risco:</strong> Aumento preventivo para manter engajamento e reduzir risco de saída<br>`
    }
    
    // Performance-based justification
    const performance = emp.desempenhoTexto?.toLowerCase() || ''
    if (performance.includes('excepcional') || performance.includes('excede')) {
      justification += `• <strong>Desempenho Excepcional:</strong> Avaliação "${emp.desempenhoTexto}" justifica reconhecimento financeiro<br>`
    }
    
    // Tenure-based justification
    if (emp.tempoDeCasa >= 5) {
      justification += `• <strong>Lealdade e Experiência:</strong> ${emp.tempoDeCasa.toFixed(1)} anos de dedicação à empresa<br>`
    }
    
    // Impact-based justification
    if (emp.impactoPerdaTexto?.toLowerCase() === 'alto' || emp.impactoPerdaTexto?.toLowerCase() === 'crítico') {
      justification += `• <strong>Impacto Estratégico:</strong> Perda classificada como "${emp.impactoPerdaTexto}" - investimento necessário<br>`
    }
    
    // Market positioning
    justification += `• <strong>Posicionamento de Mercado:</strong> Ajuste para manter competitividade salarial no cargo de ${emp.cargoAtual}<br>`
    
    justification += `<br><strong>Impacto Orçamentário:</strong><br>`
    justification += `• Impacto no orçamento departamental: ${salaryAnalysis?.budgetImpact.toFixed(2)}%<br>`
    justification += `• Orçamento disponível: ${formatCurrency(salaryAnalysis?.departmentBudget || 0)}<br>`
    
    if ((salaryAnalysis?.budgetImpact || 0) < 5) {
      justification += `• <span style="color: #22c55e;">✅ Impacto baixo no orçamento - aprovação recomendada</span><br>`
    } else if ((salaryAnalysis?.budgetImpact || 0) < 10) {
      justification += `• <span style="color: #f59e0b;">⚠️ Impacto moderado - análise adicional recomendada</span><br>`
    } else {
      justification += `• <span style="color: #ef4444;">🚨 Alto impacto orçamentário - revisão necessária</span><br>`
    }
    
    return justification
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <User className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Colaborador não encontrado</h3>
        <Link to="/employees">
          <Button variant="primary">Voltar para lista</Button>
        </Link>
      </div>
    )
  }

  const getRiskVariant = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case 'alto': return 'danger'
      case 'médio': return 'warning'
      case 'baixo': return 'success'
      default: return 'neutral'
    }
  }

  const getPerformanceVariant = (performance: string) => {
    switch (performance?.toLowerCase()) {
      case 'excepcional':
      case 'excelente':
      case 'excede':
        return 'success'
      case 'acima do esperado':
      case 'bom':
      case 'atende':
        return 'info'
      case 'regular':
      case 'parcialmente atende':
        return 'warning'
      case 'abaixo do esperado':
      case 'não atende':
        return 'danger'
      default:
        return 'neutral'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 400) return 'success'
    if (score >= 300) return 'warning'
    return 'danger'
  }

  const getScoreGrade = (score: number) => {
    if (score >= 450) return 'A+'
    if (score >= 400) return 'A'
    if (score >= 350) return 'B+'
    if (score >= 300) return 'B'
    if (score >= 250) return 'C+'
    if (score >= 200) return 'C'
    return 'D'
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return format(dateObj, 'dd/MM/yyyy', { locale: ptBR })
  }

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: User },
    { id: 'personal', label: 'Dados Pessoais', icon: Heart },
    { id: 'professional', label: 'Dados Profissionais', icon: Briefcase },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'compensation', label: 'Remuneração', icon: DollarSign },
    { id: 'education', label: 'Formação', icon: GraduationCap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai-analysis', label: 'Análise IA', icon: Zap },
    { id: 'salary-analysis', label: 'Análise Salarial', icon: Calculator }
  ]

  return (
    <div className="space-y-6">
      {/* Header Aprimorado */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="w-full h-full bg-white rounded-full transform translate-x-32 -translate-y-32" />
        </div>
        
        <div className="relative">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/employees">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-3xl backdrop-blur-sm">
                  {employee.nome?.charAt(0) || 'N'}
                </div>
                {employee.score >= 400 && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-warning-500 rounded-full flex items-center justify-center shadow-lg">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              
              <div>
                <h1 className="text-3xl font-bold mb-2">{employee.nome}</h1>
                <div className="flex items-center space-x-4 text-primary-100">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{employee.cargoAtual}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <span>{employee.area}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{employee.centroCustos}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="info" className="bg-white/20 text-white border-white/30">
                    ID: {employee.matricula}
                  </Badge>
                  <Badge variant={getRiskVariant(employee.riscoPerdaTexto || '')} className="bg-white/20 text-white border-white/30">
                    {employee.riscoPerdaTexto}
                  </Badge>
                  <Badge variant="success" className="bg-white/20 text-white border-white/30">
                    {formatCurrency(employee.salario)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-bold mb-2">{employee.score.toFixed(1)}</div>
              <div className="text-primary-200 text-sm mb-2">Score de Performance</div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                employee.score >= 400 ? 'bg-success-500' :
                employee.score >= 300 ? 'bg-warning-500' : 'bg-danger-500'
              } text-white`}>
                Grade {getScoreGrade(employee.score)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Score Overview */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Score Geral</span>
                      <span className="text-sm font-medium">{employee.score.toFixed(1)}/500</span>
                    </div>
                    <ProgressBar 
                      value={employee.score} 
                      max={500} 
                      color={getScoreColor(employee.score)}
                      size="lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">
                        #{employees.sort((a, b) => b.score - a.score).findIndex(e => e.id === employee.id) + 1}
                      </div>
                      <div className="text-xs text-primary-700">Ranking Geral</div>
                    </div>
                    <div className="text-center p-4 bg-success-50 rounded-lg">
                      <div className="text-2xl font-bold text-success-600">
                        {((employee.score / 500) * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs text-success-700">Performance</div>
                    </div>
                    <div className="text-center p-4 bg-warning-50 rounded-lg">
                      <div className="text-2xl font-bold text-warning-600">
                        {employee.tempoDeCasa.toFixed(1)}
                      </div>
                      <div className="text-xs text-warning-700">Anos na Empresa</div>
                    </div>
                    <div className="text-center p-4 bg-info-50 rounded-lg">
                      <div className="text-2xl font-bold text-info-600">
                        {employee.tempoNoCargo.toFixed(1)}
                      </div>
                      <div className="text-xs text-info-700">Anos no Cargo</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <h4 className="font-semibold text-gray-900 mb-4">Status Atual</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Risco de Perda:</span>
                      <Badge variant={getRiskVariant(employee.riscoPerdaTexto || '')}>
                        {employee.riscoPerdaTexto}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Desempenho:</span>
                      <Badge variant={getPerformanceVariant(employee.desempenhoTexto || '')}>
                        {employee.desempenhoTexto}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Impacto da Perda:</span>
                      <span className="text-sm font-medium text-gray-900">{employee.impactoPerdaTexto}</span>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h4 className="font-semibold text-gray-900 mb-4">Métricas Chave</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Absenteísmo:</span>
                      <span className="text-sm font-medium">{(employee.absenteismo * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Advertências:</span>
                      <span className="text-sm font-medium">{employee.advertencias}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Dias Afastamento:</span>
                      <span className="text-sm font-medium">{employee.diasAfastamento || 0}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          {/* Personal Data Tab */}
          {activeTab === 'personal' && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Dados Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                    <p className="text-gray-900 font-medium">{employee.nome}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Matrícula</label>
                    <p className="text-gray-900">{employee.matricula}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Gênero</label>
                    <p className="text-gray-900">{employee.genero}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Raça/Cor</label>
                    <p className="text-gray-900">{employee.racaCor}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Orientação Sexual</label>
                    <p className="text-gray-900">{employee.orientacaoSexual}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Data de Admissão</label>
                    <p className="text-gray-900">{formatDate(employee.dataAdmissao)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tempo na Empresa</label>
                    <p className="text-gray-900">{employee.tempoDeCasa.toFixed(1)} anos</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Score de Diversidade</label>
                    <div className="flex items-center space-x-2">
                      <ProgressBar value={employee.scoreDiversidade || 0} max={100} color="primary" size="sm" className="flex-1" />
                      <span className="text-sm font-medium">{(employee.scoreDiversidade || 0).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Professional Data Tab */}
          {activeTab === 'professional' && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Informações Organizacionais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Empresa</label>
                      <p className="text-gray-900">{employee.empresa}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Unidade Organizacional</label>
                      <p className="text-gray-900">{employee.unidadeOrganizacional}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Centro de Custos</label>
                      <p className="text-gray-900">{employee.centroCustos}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Gestor Imediato</label>
                      <p className="text-gray-900">{employee.gestorImediato}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Cargo Atual</label>
                      <p className="text-gray-900 font-medium">{employee.cargoAtual}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Tempo no Cargo</label>
                      <p className="text-gray-900">{employee.tempoNoCargo.toFixed(1)} anos</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Última Promoção</label>
                      <p className="text-gray-900">{formatDate(employee.dataUltimaPromocao)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Score de Experiência</label>
                      <div className="flex items-center space-x-2">
                        <ProgressBar value={employee.scoreExperiencia || 0} max={100} color="success" size="sm" className="flex-1" />
                        <span className="text-sm font-medium">{(employee.scoreExperiencia || 0).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Avaliação de Desempenho</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Resultado da Última Avaliação</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={getPerformanceVariant(employee.resultadoAvaliacaoDesempenho)} size="lg">
                          {employee.resultadoAvaliacaoDesempenho}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Data da Última Avaliação</label>
                      <p className="text-gray-900">{formatDate(employee.dataUltimaAvaliacao)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Número de Advertências (12 meses)</label>
                      <div className="flex items-center space-x-2">
                        {employee.numeroAdvertencias === 0 ? (
                          <CheckCircle className="h-5 w-5 text-success-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-warning-500" />
                        )}
                        <span className="text-gray-900 font-medium">{employee.numeroAdvertencias}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Faltas Injustificadas</label>
                      <div className="flex items-center space-x-2">
                        {employee.faltasInjustificadas === 0 ? (
                          <CheckCircle className="h-5 w-5 text-success-500" />
                        ) : employee.faltasInjustificadas <= 3 ? (
                          <AlertCircle className="h-5 w-5 text-warning-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-danger-500" />
                        )}
                        <span className="text-gray-900 font-medium">{employee.faltasInjustificadas}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Dias de Afastamento (12 meses)</label>
                      <p className="text-gray-900">{employee.diasAfastamento || 0} dias</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Taxa de Absenteísmo</label>
                      <div className="flex items-center space-x-2">
                        <ProgressBar 
                          value={employee.absenteismo * 100} 
                          max={100} 
                          color={employee.absenteismo > 0.05 ? 'danger' : 'success'} 
                          size="sm" 
                          className="flex-1" 
                        />
                        <span className="text-sm font-medium">{(employee.absenteismo * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Risk Assessment */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Avaliação de Risco</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Probabilidade de Risco de Perda</label>
                    <div className="mt-2">
                      <Badge variant={getRiskVariant(employee.probabilidadeRiscoPerda)} size="lg">
                        {employee.probabilidadeRiscoPerda}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Impacto da Perda</label>
                    <div className="mt-2">
                      <Badge variant={employee.impactoPerda?.toLowerCase() === 'alto' ? 'danger' : 'warning'} size="lg">
                        {employee.impactoPerda}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                {employee.riskFactors && employee.riskFactors.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Fatores de Risco Identificados</h4>
                    <div className="space-y-2">
                      {employee.riskFactors.map((factor, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-warning-50 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-warning-600 flex-shrink-0" />
                          <span className="text-sm text-warning-700">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths */}
                {employee.strengths && employee.strengths.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Pontos Fortes</h4>
                    <div className="space-y-2">
                      {employee.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-success-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-success-600 flex-shrink-0" />
                          <span className="text-sm text-success-700">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* Compensation Tab */}
          {activeTab === 'compensation' && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Informações Salariais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Salário Atual</label>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(employee.salario)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tabela Salarial</label>
                    <p className="text-gray-900">{employee.tabelaSalarial}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Faixa Salarial</label>
                    <p className="text-gray-900">{employee.faixaSalarial}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nível Salarial</label>
                    <p className="text-gray-900">{employee.nivelSalarial}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Última Promoção/Reajuste</label>
                    <p className="text-gray-900">{formatDate(employee.dataUltimaPromocao)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Reajuste Sugerido</label>
                    <p className="text-gray-900 font-medium">{employee.reajusteSugerido?.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Formação e Desenvolvimento</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Grau de Escolaridade</label>
                      <p className="text-gray-900 font-medium">{employee.grauEscolaridade}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Cursos Concluídos</label>
                      <p className="text-gray-900">{employee.cursosConcluidos || 'Nenhum informado'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Certificações Relevantes</label>
                      <p className="text-gray-900">{employee.certificacoesRelevantes || 'Nenhuma informada'}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Idiomas Falados</label>
                      <p className="text-gray-900">{employee.idiomasFalados || 'Não informado'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Última Atualização de Formação</label>
                      <p className="text-gray-900">{formatDate(employee.atualizacaoRecenteFormacao)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Score de Formação</label>
                      <div className="flex items-center space-x-2">
                        <ProgressBar value={employee.scoreFormacao || 0} max={100} color="primary" size="sm" className="flex-1" />
                        <span className="text-sm font-medium">{(employee.scoreFormacao || 0).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics Avançado</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Score de Sentimento</label>
                      <div className="flex items-center space-x-2">
                        <ProgressBar 
                          value={employee.scoreSentimento * 100} 
                          max={100} 
                          color={employee.scoreSentimento > 0.6 ? 'danger' : employee.scoreSentimento > 0.3 ? 'warning' : 'success'} 
                          size="sm" 
                          className="flex-1" 
                        />
                        <span className="text-sm font-medium">
                          {employee.scoreSentimento > 0.6 ? 'Negativo' :
                           employee.scoreSentimento > 0.3 ? 'Neutro' : 'Positivo'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Absenteísmo Anômalo</label>
                      <div className="flex items-center space-x-2">
                        {employee.isAbsenteismoAnomalo ? (
                          <>
                            <AlertTriangle className="h-5 w-5 text-warning-500" />
                            <span className="text-warning-700 font-medium">Detectado</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-5 w-5 text-success-500" />
                            <span className="text-success-700 font-medium">Normal</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Ranking na Empresa</label>
                      <p className="text-2xl font-bold text-primary-600">
                        #{employees.sort((a, b) => b.score - a.score).findIndex(e => e.id === employee.id) + 1}
                      </p>
                      <p className="text-sm text-gray-600">de {employees.length} colaboradores</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Percentil</label>
                      <p className="text-lg font-bold text-success-600">
                        {(((employees.length - employees.sort((a, b) => b.score - a.score).findIndex(e => e.id === employee.id)) / employees.length) * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Score Breakdown */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Composição do Score</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Desempenho</span>
                      <span>{((employee.score / 500) * 100).toFixed(1)}%</span>
                    </div>
                    <ProgressBar value={employee.score} max={500} color="primary" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Experiência</span>
                      <span>{(employee.scoreExperiencia || 0).toFixed(1)}%</span>
                    </div>
                    <ProgressBar value={employee.scoreExperiencia || 0} max={100} color="success" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Formação</span>
                      <span>{(employee.scoreFormacao || 0).toFixed(1)}%</span>
                    </div>
                    <ProgressBar value={employee.scoreFormacao || 0} max={100} color="info" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Diversidade</span>
                      <span>{(employee.scoreDiversidade || 0).toFixed(1)}%</span>
                    </div>
                    <ProgressBar value={employee.scoreDiversidade || 0} max={100} color="warning" size="sm" />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* AI Analysis Tab */}
          {activeTab === 'ai-analysis' && (
            <AnalysisPanel
              analysis={analysis}
              analysisType={analysisType}
              loading={loading}
              onAnalyze={handleAnalyze}
            />
          )}

          {/* Salary Analysis Tab */}
          {activeTab === 'salary-analysis' && salaryAnalysis && (
            <div className="space-y-6">
              <Card>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-success-100 rounded-lg">
                    <Calculator className="h-6 w-6 text-success-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Análise Salarial Inteligente</h3>
                    <p className="text-sm text-gray-600">Recomendação baseada em IA e dados de mercado</p>
                  </div>
                  <div className="flex items-center space-x-1 ml-auto">
                    <Brain className="h-4 w-4 text-primary-500" />
                    <span className="text-xs text-primary-600 font-medium">IA Generativa</span>
                  </div>
                </div>

                {/* Salary Recommendation Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {formatCurrency(salaryAnalysis.currentSalary)}
                    </div>
                    <div className="text-sm text-gray-600">Salário Atual</div>
                  </div>
                  
                  <div className="text-center p-4 bg-success-50 rounded-lg">
                    <div className="text-2xl font-bold text-success-600 mb-1">
                      +{formatCurrency(salaryAnalysis.suggestedIncrease)}
                    </div>
                    <div className="text-sm text-success-700">Aumento Sugerido</div>
                    <div className="text-xs text-success-600 mt-1">
                      {((salaryAnalysis.suggestedIncrease / salaryAnalysis.currentSalary) * 100).toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600 mb-1">
                      {formatCurrency(salaryAnalysis.newSalary)}
                    </div>
                    <div className="text-sm text-primary-700">Novo Salário</div>
                  </div>
                </div>

                {/* Budget Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-warning-50 rounded-lg">
                    <h4 className="font-medium text-warning-900 mb-2">Impacto Orçamentário</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Orçamento Departamental:</span>
                        <span className="font-medium">{formatCurrency(salaryAnalysis.departmentBudget)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Impacto do Aumento:</span>
                        <span className="font-medium">{salaryAnalysis.budgetImpact.toFixed(2)}%</span>
                      </div>
                      <ProgressBar 
                        value={salaryAnalysis.budgetImpact} 
                        max={10} 
                        color={salaryAnalysis.budgetImpact < 5 ? 'success' : salaryAnalysis.budgetImpact < 10 ? 'warning' : 'danger'}
                        size="sm"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-info-50 rounded-lg">
                    <h4 className="font-medium text-info-900 mb-2">Status da Recomendação</h4>
                    <div className="space-y-2">
                      {salaryAnalysis.budgetImpact < 5 ? (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-success-500" />
                          <span className="text-sm text-success-700 font-medium">Aprovação Recomendada</span>
                        </div>
                      ) : salaryAnalysis.budgetImpact < 10 ? (
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-5 w-5 text-warning-500" />
                          <span className="text-sm text-warning-700 font-medium">Análise Adicional Necessária</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <XCircle className="h-5 w-5 text-danger-500" />
                          <span className="text-sm text-danger-700 font-medium">Revisão Orçamentária Necessária</span>
                        </div>
                      )}
                      <p className="text-xs text-gray-600">
                        Baseado em análise de performance, risco e mercado
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Justification */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Justificativa Detalhada da IA</h4>
                  <div 
                    className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: salaryAnalysis.justification }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <Button variant="primary" className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar Recomendação
                  </Button>
                  <Button variant="secondary">
                    <Edit className="h-4 w-4 mr-2" />
                    Ajustar Valores
                  </Button>
                  <Button variant="ghost">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Análise
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <Button variant="primary" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Enviar Email
              </Button>
              <Button variant="secondary" className="w-full">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Agendar Reunião
              </Button>
              <Button variant="secondary" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
              <Button variant="secondary" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Exportar Dados
              </Button>
            </div>
          </Card>

          {/* Salary Quick Info */}
          {salaryAnalysis && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo Salarial</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Atual:</span>
                  <span className="font-medium">{formatCurrency(salaryAnalysis.currentSalary)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sugerido:</span>
                  <span className="font-medium text-success-600">
                    +{((salaryAnalysis.suggestedIncrease / salaryAnalysis.currentSalary) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Novo Total:</span>
                  <span className="font-bold text-primary-600">{formatCurrency(salaryAnalysis.newSalary)}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-xs text-gray-500">
                    Impacto orçamentário: {salaryAnalysis.budgetImpact.toFixed(2)}%
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Alerts */}
          {(employee.isAbsenteismoAnomalo || employee.scoreSentimento > 0.6 || employee.riscoPerdaTexto?.toLowerCase() === 'alto') && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas</h3>
              <div className="space-y-3">
                {employee.riscoPerdaTexto?.toLowerCase() === 'alto' && (
                  <div className="flex items-center space-x-2 p-3 bg-danger-50 rounded-lg border border-danger-200">
                    <AlertTriangle className="h-4 w-4 text-danger-600 flex-shrink-0" />
                    <span className="text-sm text-danger-700">
                      Colaborador de alto risco de saída
                    </span>
                  </div>
                )}

                {employee.isAbsenteismoAnomalo && (
                  <div className="flex items-center space-x-2 p-3 bg-warning-50 rounded-lg border border-warning-200">
                    <AlertTriangle className="h-4 w-4 text-warning-600 flex-shrink-0" />
                    <span className="text-sm text-warning-700">
                      Padrão de absenteísmo anômalo detectado
                    </span>
                  </div>
                )}

                {employee.scoreSentimento > 0.6 && (
                  <div className="flex items-center space-x-2 p-3 bg-danger-50 rounded-lg border border-danger-200">
                    <TrendingDown className="h-4 w-4 text-danger-600 flex-shrink-0" />
                    <span className="text-sm text-danger-700">
                      Sentimento negativo detectado na avaliação
                    </span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Feedback Card */}
          {employee.feedbackUltimaAvaliacao && (
            <Card>
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Última Avaliação</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {employee.feedbackUltimaAvaliacao}
              </p>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Análise de Sentimento:</span>
                  <Badge variant={
                    employee.scoreSentimento > 0.6 ? 'danger' :
                    employee.scoreSentimento > 0.3 ? 'warning' : 'success'
                  } size="sm">
                    {employee.scoreSentimento > 0.6 ? 'Negativo' :
                     employee.scoreSentimento > 0.3 ? 'Neutro' : 'Positivo'}
                  </Badge>
                </div>
              </div>
            </Card>
          )}

          {/* Timeline */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Admissão</p>
                  <p className="text-xs text-gray-600">{formatDate(employee.dataAdmissao)}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Última Promoção</p>
                  <p className="text-xs text-gray-600">{formatDate(employee.dataUltimaPromocao)}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-warning-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Última Avaliação</p>
                  <p className="text-xs text-gray-600">{formatDate(employee.dataUltimaAvaliacao)}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}