import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Award,
  ArrowUpRight,
  Eye,
  Sparkles,
  Target,
  Brain
} from 'lucide-react'
import { useStore } from '../store/useStore'
import MetricCard from '../components/enhanced/MetricCard'
import EmployeeRankingChart from '../components/EmployeeRankingChart'
import RiskDistributionChart from '../components/RiskDistributionChart'
import DepartmentMetricsChart from '../components/DepartmentMetricsChart'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Badge from '../components/ui/Badge'

export default function Dashboard() {
  const { employees, loading, fetchEmployees } = useStore()

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Carregando dados dos colaboradores...</p>
        </div>
      </div>
    )
  }

  // Calculate metrics
  const totalEmployees = employees.length
  const highRiskEmployees = employees.filter(emp => 
    emp.riscoPerdaTexto?.toLowerCase() === 'alto'
  ).length
  const averageScore = employees.length > 0 
    ? employees.reduce((sum, emp) => sum + emp.score, 0) / employees.length 
    : 0
  const retentionRate = totalEmployees > 0 
    ? ((totalEmployees - highRiskEmployees) / totalEmployees) * 100 
    : 0

  const topPerformers = employees
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  const riskDistribution = {
    alto: employees.filter(emp => emp.riscoPerdaTexto?.toLowerCase() === 'alto').length,
    medio: employees.filter(emp => emp.riscoPerdaTexto?.toLowerCase() === 'médio').length,
    baixo: employees.filter(emp => emp.riscoPerdaTexto?.toLowerCase() === 'baixo').length,
  }

  // Department metrics
  const departmentMetrics = employees.reduce((acc, emp) => {
    const dept = emp.area || 'Não definido'
    if (!acc[dept]) {
      acc[dept] = { employees: [], totalScore: 0 }
    }
    acc[dept].employees.push(emp)
    acc[dept].totalScore += emp.score
    return acc
  }, {} as Record<string, { employees: any[], totalScore: number }>)

  const departmentData = Object.entries(departmentMetrics).map(([dept, data]) => ({
    department: dept,
    count: data.employees.length,
    averageScore: data.totalScore / data.employees.length,
    highRisk: data.employees.filter(emp => emp.riscoPerdaTexto?.toLowerCase() === 'alto').length
  }))

  // Critical alerts
  const criticalAlerts = employees.filter(emp => 
    emp.riscoPerdaTexto?.toLowerCase() === 'alto' || 
    emp.isAbsenteismoAnomalo || 
    emp.scoreSentimento > 0.6
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Visão geral da gestão de talentos e métricas de retenção
          </p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-2 bg-primary-50 rounded-lg">
          <Brain className="h-5 w-5 text-primary-600" />
          <span className="text-sm font-medium text-primary-700">IA Ativa</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total de Colaboradores"
          value={totalEmployees.toString()}
          icon={Users}
          trend={{ value: 5.2, isPositive: true }}
          className="gradient-primary text-white"
          description="Número total de colaboradores ativos na empresa"
        />
        <MetricCard
          title="Colaboradores de Alto Risco"
          value={highRiskEmployees.toString()}
          icon={AlertTriangle}
          trend={{ value: 2.1, isPositive: false }}
          className="gradient-danger text-white"
          description="Colaboradores com alta probabilidade de saída"
        />
        <MetricCard
          title="Score Médio"
          value={averageScore.toFixed(1)}
          icon={TrendingUp}
          trend={{ value: 8.3, isPositive: true }}
          className="gradient-success text-white"
          description="Score médio de reconhecimento dos colaboradores"
        />
        <MetricCard
          title="Taxa de Retenção"
          value={`${retentionRate.toFixed(1)}%`}
          icon={Award}
          trend={{ value: 3.7, isPositive: true }}
          className="gradient-warning text-white"
          description="Percentual de colaboradores com baixo risco de saída"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Ações Rápidas</h3>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-primary-500" />
            <span className="text-sm text-primary-600">Sugestões da IA</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/employees?filter=alto" className="block">
            <div className="p-4 border border-danger-200 rounded-lg hover:bg-danger-50 transition-colors">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-danger-600" />
                <div>
                  <p className="font-medium text-danger-900">Revisar Alto Risco</p>
                  <p className="text-sm text-danger-700">{highRiskEmployees} colaboradores precisam de atenção</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/analytics" className="block">
            <div className="p-4 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Target className="h-6 w-6 text-primary-600" />
                <div>
                  <p className="font-medium text-primary-900">Análise Preditiva</p>
                  <p className="text-sm text-primary-700">Identificar tendências futuras</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/reports" className="block">
            <div className="p-4 border border-success-200 rounded-lg hover:bg-success-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-success-600" />
                <div>
                  <p className="font-medium text-success-900">Gerar Relatório</p>
                  <p className="text-sm text-success-700">Relatório executivo mensal</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Employee Ranking */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
            <Link to="/employees">
              <Button variant="ghost" size="sm">
                Ver todos
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <EmployeeRankingChart employees={topPerformers} />
        </Card>

        {/* Risk Distribution */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Distribuição de Risco</h3>
            <Link to="/analytics">
              <Button variant="ghost" size="sm">
                Análise detalhada
                <Eye className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <RiskDistributionChart data={riskDistribution} />
        </Card>
      </div>

      {/* Department Metrics */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Métricas por Departamento</h3>
          <Link to="/analytics">
            <Button variant="ghost" size="sm">
              Ver relatório completo
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <DepartmentMetricsChart data={departmentData} />
      </Card>

      {/* Critical Alerts */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Alertas Críticos</h3>
          <div className="flex items-center space-x-2">
            <Badge variant="danger" size="sm">
              {criticalAlerts.length} alertas
            </Badge>
            <Link to="/alerts">
              <Button variant="ghost" size="sm">
                Ver todos os alertas
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          {criticalAlerts.slice(0, 5).map((emp) => (
            <div key={emp.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-danger-50 to-warning-50 rounded-lg border border-danger-200">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-danger-600" />
                <div>
                  <p className="font-medium text-gray-900">{emp.nome}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {emp.riscoPerdaTexto?.toLowerCase() === 'alto' && (
                      <Badge variant="danger" size="sm">Alto risco</Badge>
                    )}
                    {emp.isAbsenteismoAnomalo && (
                      <Badge variant="warning" size="sm">Absenteísmo anômalo</Badge>
                    )}
                    {emp.scoreSentimento > 0.6 && (
                      <Badge variant="danger" size="sm">Sentimento negativo</Badge>
                    )}
                  </div>
                </div>
              </div>
              <Link to={`/employees/${emp.id}`}>
                <Button variant="primary" size="sm">
                  Analisar
                </Button>
              </Link>
            </div>
          ))}
          {criticalAlerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Award className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>Nenhum alerta crítico no momento</p>
              <p className="text-sm text-gray-400 mt-1">Todos os colaboradores estão em situação estável</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}