import React from 'react'
import { Search, Filter, RotateCcw } from 'lucide-react'
import Card from '../ui/Card'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'

interface FilterPanelProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  filterRisk: string
  setFilterRisk: (risk: string) => void
  filterDepartment: string
  setFilterDepartment: (dept: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  departments: string[]
  onReset: () => void
}

export default function FilterPanel({
  searchTerm,
  setSearchTerm,
  filterRisk,
  setFilterRisk,
  filterDepartment,
  setFilterDepartment,
  sortBy,
  setSortBy,
  departments,
  onReset
}: FilterPanelProps) {
  const riskOptions = [
    { value: 'all', label: 'Todos os níveis' },
    { value: 'alto', label: 'Alto Risco' },
    { value: 'médio', label: 'Médio Risco' },
    { value: 'baixo', label: 'Baixo Risco' }
  ]

  const departmentOptions = [
    { value: 'all', label: 'Todos os departamentos' },
    ...departments.map(dept => ({ value: dept, label: dept }))
  ]

  const sortOptions = [
    { value: 'score', label: 'Score (maior primeiro)' },
    { value: 'name', label: 'Nome (A-Z)' },
    { value: 'risk', label: 'Nível de Risco' },
    { value: 'performance', label: 'Performance' }
  ]

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Limpar
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          label="Buscar"
          placeholder="Nome ou departamento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="h-4 w-4" />}
        />
        
        <Select
          label="Nível de Risco"
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value)}
          options={riskOptions}
        />

        <Select
          label="Departamento"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          options={departmentOptions}
        />

        <Select
          label="Ordenar por"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          options={sortOptions}
        />
      </div>
    </Card>
  )
}