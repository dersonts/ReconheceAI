import { create } from 'zustand'
import { Employee, Alert, WeightConfig } from '../types'
import { EnhancedDataService } from '../services/enhancedDataService'

interface AppState {
  // Employees
  employees: Employee[]
  selectedEmployee: Employee | null
  loading: boolean
  
  // Alerts
  alerts: Alert[]
  unreadAlertsCount: number
  
  // Settings
  weightConfig: WeightConfig
  
  // Actions
  setEmployees: (employees: Employee[]) => void
  setSelectedEmployee: (employee: Employee | null) => void
  setLoading: (loading: boolean) => void
  addAlert: (alert: Alert) => void
  markAlertAsRead: (alertId: string) => void
  updateWeightConfig: (config: WeightConfig) => void
  
  // API calls
  fetchEmployees: () => Promise<void>
  analyzeEmployee: (employeeId: number, analysisType: string, weights: WeightConfig) => Promise<string>
}

const defaultWeights: WeightConfig = {
  desempenho: 20,
  tempoCargo: 10,
  tempoCasa: 10,
  riscoPerda: 15,
  impactoPerda: 15,
  absenteismo: 10,
  salario: 5,
  formacao: 5,
  diversidade: 5,
  experiencia: 5
}

const dataService = new EnhancedDataService()

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  employees: [],
  selectedEmployee: null,
  loading: false,
  alerts: [],
  unreadAlertsCount: 0,
  weightConfig: defaultWeights,
  
  // Actions
  setEmployees: (employees) => set({ employees }),
  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),
  setLoading: (loading) => set({ loading }),
  
  addAlert: (alert) => set((state) => ({
    alerts: [alert, ...state.alerts],
    unreadAlertsCount: state.unreadAlertsCount + 1
  })),
  
  markAlertAsRead: (alertId) => set((state) => ({
    alerts: state.alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ),
    unreadAlertsCount: Math.max(0, state.unreadAlertsCount - 1)
  })),
  
  updateWeightConfig: (config) => set({ weightConfig: config }),
  
  // API calls
  fetchEmployees: async () => {
    set({ loading: true })
    try {
      const employees = await dataService.getEmployees()
      set({ employees, loading: false })
    } catch (error) {
      console.error('Error fetching employees:', error)
      set({ loading: false })
    }
  },
  
  analyzeEmployee: async (employeeId, analysisType, weights) => {
    try {
      return await dataService.analyzeEmployee(employeeId, analysisType, weights)
    } catch (error) {
      console.error('Error analyzing employee:', error)
      throw error
    }
  }
}))