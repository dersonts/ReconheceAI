import { Employee, CSVRecord } from '../types'

export class DataProcessor {
  
  static parseDate(dateString: string): Date {
    if (!dateString || dateString.trim() === '') {
      return new Date()
    }
    
    // Tenta diferentes formatos de data
    const formats = [
      /(\d{2})\/(\d{2})\/(\d{4})/, // DD/MM/YYYY
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/, // D/M/YYYY
      /(\d{4})-(\d{2})-(\d{2})/, // YYYY-MM-DD
    ]
    
    for (const format of formats) {
      const match = dateString.match(format)
      if (match) {
        if (format === formats[2]) { // YYYY-MM-DD
          return new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))
        } else { // DD/MM/YYYY or D/M/YYYY
          return new Date(parseInt(match[3]), parseInt(match[2]) - 1, parseInt(match[1]))
        }
      }
    }
    
    return new Date()
  }
  
  static parseNumber(value: string): number {
    if (!value || value.trim() === '') return 0
    
    // Remove caracteres não numéricos exceto vírgula e ponto
    const cleaned = value.replace(/[^\d,.-]/g, '')
    
    // Substitui vírgula por ponto para decimais
    const normalized = cleaned.replace(',', '.')
    
    const parsed = parseFloat(normalized)
    return isNaN(parsed) ? 0 : parsed
  }
  
  static parseTimeInMonths(timeString: string): number {
    if (!timeString || timeString.trim() === '') return 0
    
    const lowerTime = timeString.toLowerCase()
    
    // Extrai números do texto
    const numbers = timeString.match(/\d+/g)
    if (!numbers || numbers.length === 0) return 0
    
    const value = parseInt(numbers[0])
    
    if (lowerTime.includes('ano')) {
      return value * 12
    } else if (lowerTime.includes('mes')) {
      return value
    } else if (lowerTime.includes('dia')) {
      return Math.round(value / 30)
    }
    
    // Se não especificado, assume meses
    return value
  }
  
  static calculateTenure(admissionDate: Date): number {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - admissionDate.getTime())
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25)
    return Math.round(diffYears * 10) / 10
  }
  
  static calculateTimeSincePromotion(promotionDate: Date): number {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - promotionDate.getTime())
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25)
    return Math.round(diffYears * 10) / 10
  }
  
  static calculateExperienceScore(tempoCasa: number, tempoNoCargo: number): number {
    // Score baseado na experiência total e estabilidade no cargo
    const experienceWeight = Math.min(tempoCasa / 10, 1) * 0.7 // Máximo aos 10 anos
    const stabilityWeight = Math.min(tempoNoCargo / 5, 1) * 0.3 // Máximo aos 5 anos
    return (experienceWeight + stabilityWeight) * 100
  }
  
  static calculateDiversityScore(employee: Employee): number {
    let score = 0
    
    // Pontuação por diversidade de gênero
    if (employee.genero !== 'Masculino') score += 20
    
    // Pontuação por diversidade racial
    if (employee.racaCor !== 'Branca') score += 20
    
    // Pontuação por diversidade de orientação sexual
    if (employee.orientacaoSexual !== 'Heterosexual') score += 20
    
    // Pontuação por formação
    if (employee.grauEscolaridade.includes('Superior') || employee.grauEscolaridade.includes('Pós')) {
      score += 20
    }
    
    // Pontuação por idiomas
    if (employee.idiomasFalados && employee.idiomasFalados !== 'Português') {
      score += 20
    }
    
    return Math.min(score, 100)
  }
  
  static calculateEducationScore(grauEscolaridade: string, cursos: string, certificacoes: string): number {
    let score = 0
    
    // Score base por escolaridade
    switch (grauEscolaridade.toLowerCase()) {
      case 'pós-graduação':
      case 'mestrado':
      case 'doutorado':
        score += 40
        break
      case 'superior completo':
        score += 30
        break
      case 'superior incompleto':
        score += 20
        break
      case 'ensino médio':
        score += 10
        break
      default:
        score += 5
    }
    
    // Pontuação adicional por cursos
    if (cursos && cursos !== 'Nenhuma' && cursos.trim() !== '') {
      score += 20
    }
    
    // Pontuação adicional por certificações
    if (certificacoes && certificacoes !== 'Nenhuma' && certificacoes.trim() !== '') {
      score += 30
    }
    
    return Math.min(score, 100)
  }
  
  static identifyRiskFactors(employee: Employee): string[] {
    const factors: string[] = []
    
    if (employee.probabilidadeRiscoPerda.toLowerCase() === 'alto') {
      factors.push('Alto risco de perda identificado')
    }
    
    if (employee.numeroAdvertencias > 0) {
      factors.push(`${employee.numeroAdvertencias} advertência(s) nos últimos 12 meses`)
    }
    
    if (employee.faltasInjustificadas > 5) {
      factors.push('Alto índice de faltas injustificadas')
    }
    
    if (employee.diasAfastamento > 30) {
      factors.push('Muitos dias de afastamento')
    }
    
    if (employee.tempoUltimaPromocao > 3) {
      factors.push('Sem promoção há mais de 3 anos')
    }
    
    if (employee.resultadoAvaliacaoDesempenho.toLowerCase().includes('não atende')) {
      factors.push('Desempenho abaixo do esperado')
    }
    
    return factors
  }
  
  static identifyStrengths(employee: Employee): string[] {
    const strengths: string[] = []
    
    if (employee.resultadoAvaliacaoDesempenho.toLowerCase().includes('excede')) {
      strengths.push('Desempenho excepcional')
    }
    
    if (employee.tempoDeCasa > 5) {
      strengths.push('Alta lealdade à empresa')
    }
    
    if (employee.numeroAdvertencias === 0) {
      strengths.push('Histórico disciplinar limpo')
    }
    
    if (employee.grauEscolaridade.includes('Pós') || employee.grauEscolaridade.includes('Superior')) {
      strengths.push('Alta qualificação acadêmica')
    }
    
    if (employee.certificacoesRelevantes && employee.certificacoesRelevantes !== 'Nenhuma') {
      strengths.push('Certificações profissionais relevantes')
    }
    
    if (employee.faltasInjustificadas === 0) {
      strengths.push('Excelente assiduidade')
    }
    
    return strengths
  }
  
  static generateFeedback(employee: Employee): string {
    const performance = employee.resultadoAvaliacaoDesempenho.toLowerCase()
    const risk = employee.probabilidadeRiscoPerda.toLowerCase()
    
    let feedback = `${employee.nome} `
    
    if (performance.includes('excede')) {
      feedback += 'demonstra desempenho excepcional e é uma referência para a equipe. '
    } else if (performance.includes('atende')) {
      feedback += 'apresenta desempenho sólido e consistente. '
    } else if (performance.includes('parcialmente')) {
      feedback += 'tem potencial, mas precisa de desenvolvimento em algumas áreas. '
    } else {
      feedback += 'necessita de atenção e suporte para melhorar o desempenho. '
    }
    
    if (risk === 'alto') {
      feedback += 'Há sinais de que pode estar considerando oportunidades externas. '
    } else if (risk === 'médio') {
      feedback += 'Demonstra satisfação moderada com a posição atual. '
    } else {
      feedback += 'Mostra-se satisfeito e engajado com a empresa. '
    }
    
    if (employee.numeroAdvertencias > 0) {
      feedback += `Teve ${employee.numeroAdvertencias} advertência(s) que requer atenção. `
    }
    
    if (employee.tempoUltimaPromocao > 2) {
      feedback += 'Pode se beneficiar de discussões sobre crescimento na carreira. '
    }
    
    return feedback.trim()
  }
}