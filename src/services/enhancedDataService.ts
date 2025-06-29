import { Employee } from '../types'
import { DataProcessor } from './dataProcessor'

// Dados do CSV real processados
const csvRealData: any[] = [
  {
    'ID do Colaborador': '4894',
    'Nome do Colaborador': 'Carlos Souza',
    'Matrícula': '328632',
    'Gênero': 'Masculino',
    'Raça/Cor': 'Amarela',
    'Orientação Sexual': 'Heterosexual',
    'Empresa': 'Empresa X',
    'Unidade Organizacional': 'Comercial',
    'Centro de custos': 'CC101',
    'Gestor Imediato': 'João Silva',
    'Cargo Atual': 'Pleno',
    'Tabela Salarial': 'Tabela A',
    'Faixa Salarial': 'Faixa Pleno',
    'Nível Salarial': 'Médio',
    'Salário': '6295.72',
    'Data de Admissão': '20/01/2017',
    'Data da Última Promoção ou Reajuste': '03/06/2025',
    'Resultado da Avaliação de Desempenho': 'Excede',
    'Data da Última Avaliação': '25/12/2023',
    'Número de Advertências nos últimos 12 meses': '0',
    'Faltas Injustificadas / Absenteísmo': '0',
    'Dias de Afastamento (últimos 12 meses)': '4',
    'Probabilidade de Risco de Perda': 'Baixo',
    'Impacto da Perda': 'Médio',
    'Grau de Escolaridade': 'Ensino Médio',
    'Cursos concluídos': 'Inglês Intermediário',
    'Certificações relevantes': 'Nenhuma',
    'Idiomas falados': 'Inglês',
    'Atualização recente (formação)': '01/03/2024',
    'Tempo no cargo atual': '5 meses'
  },
  {
    'ID do Colaborador': '1461',
    'Nome do Colaborador': 'Fernanda Lima',
    'Matrícula': '276751',
    'Gênero': 'Feminino',
    'Raça/Cor': 'Amarela',
    'Orientação Sexual': 'Heterosexual',
    'Empresa': 'Empresa X',
    'Unidade Organizacional': 'Comercial',
    'Centro de custos': 'CC101',
    'Gestor Imediato': 'João Silva',
    'Cargo Atual': 'Júnior',
    'Tabela Salarial': 'Tabela A',
    'Faixa Salarial': 'Faixa Júnior',
    'Nível Salarial': 'Máximo',
    'Salário': '3682.06',
    'Data de Admissão': '15/05/2019',
    'Data da Última Promoção ou Reajuste': '03/04/2025',
    'Resultado da Avaliação de Desempenho': 'Excede',
    'Data da Última Avaliação': '03/03/2024',
    'Número de Advertências nos últimos 12 meses': '1',
    'Faltas Injustificadas / Absenteísmo': '4',
    'Dias de Afastamento (últimos 12 meses)': '11',
    'Probabilidade de Risco de Perda': 'Médio',
    'Impacto da Perda': 'Médio',
    'Grau de Escolaridade': 'Superior Completo',
    'Cursos concluídos': 'Liderança',
    'Certificações relevantes': 'PMP',
    'Idiomas falados': 'Espanhol',
    'Atualização recente (formação)': '20/03/2025',
    'Tempo no cargo atual': '15 meses'
  },
  {
    'ID do Colaborador': '1104',
    'Nome do Colaborador': 'Larissa Souza',
    'Matrícula': '944981',
    'Gênero': 'Masculino',
    'Raça/Cor': 'Parda',
    'Orientação Sexual': 'Homosexual',
    'Empresa': 'Empresa X',
    'Unidade Organizacional': 'Comercial',
    'Centro de custos': 'CC101',
    'Gestor Imediato': 'João Silva',
    'Cargo Atual': 'Sênior',
    'Tabela Salarial': 'Tabela A',
    'Faixa Salarial': 'Faixa Sênior',
    'Nível Salarial': 'Mínimo',
    'Salário': '9287.57',
    'Data de Admissão': '02/11/2017',
    'Data da Última Promoção ou Reajuste': '10/12/2024',
    'Resultado da Avaliação de Desempenho': 'Parcialmente Atende',
    'Data da Última Avaliação': '01/01/2025',
    'Número de Advertências nos últimos 12 meses': '2',
    'Faltas Injustificadas / Absenteísmo': '2',
    'Dias de Afastamento (últimos 12 meses)': '9',
    'Probabilidade de Risco de Perda': 'Alto',
    'Impacto da Perda': 'Alto',
    'Grau de Escolaridade': 'Superior Completo',
    'Cursos concluídos': 'Inglês Intermediário',
    'Certificações relevantes': 'Nenhuma',
    'Idiomas falados': 'Espanhol',
    'Atualização recente (formação)': '05/05/2025',
    'Tempo no cargo atual': '54 meses'
  },
  {
    'ID do Colaborador': '8225',
    'Nome do Colaborador': 'Beatriz Ferreira',
    'Matrícula': '289813',
    'Gênero': 'Feminino',
    'Raça/Cor': 'Indígena',
    'Orientação Sexual': 'Heterosexual',
    'Empresa': 'Empresa X',
    'Unidade Organizacional': 'Administrativo',
    'Centro de custos': 'CC105',
    'Gestor Imediato': 'Larissa Oliveira',
    'Cargo Atual': 'Júnior',
    'Tabela Salarial': 'Tabela A',
    'Faixa Salarial': 'Faixa Júnior',
    'Nível Salarial': 'Médio',
    'Salário': '4036.89',
    'Data de Admissão': '20/08/2023',
    'Data da Última Promoção ou Reajuste': '21/01/2021',
    'Resultado da Avaliação de Desempenho': 'Parcialmente Atende',
    'Data da Última Avaliação': '08/05/2025',
    'Número de Advertências nos últimos 12 meses': '1',
    'Faltas Injustificadas / Absenteísmo': '2',
    'Dias de Afastamento (últimos 12 meses)': '18',
    'Probabilidade de Risco de Perda': 'Médio',
    'Impacto da Perda': 'Médio',
    'Grau de Escolaridade': 'Pós-graduação',
    'Cursos concluídos': 'Excel Avançado',
    'Certificações relevantes': 'Nenhuma',
    'Idiomas falados': 'Inglês',
    'Atualização recente (formação)': '09/03/2023',
    'Tempo no cargo atual': '28 meses'
  }
  // Adicione mais registros conforme necessário...
]

// Serviço aprimorado de cálculo de score
class EnhancedScoreCalculatorService {
  private converterTextoParaNumero(tipo: string, texto: string): number {
    if (!texto) return 0.0
    
    const maps = {
      risco: { 'alto': 1.0, 'médio': 0.5, 'baixo': 0.1 },
      impacto: { 'estratégico': 1.0, 'alto': 1.0, 'crítico': 1.0, 'médio': 0.5, 'moderado': 0.5, 'baixo': 0.1 },
      desempenho: { 
        'excede': 1.0, 
        'excepcional': 1.0,
        'atende': 0.8, 
        'parcialmente atende': 0.6, 
        'não atende': 0.3 
      }
    }
    
    const map = maps[tipo as keyof typeof maps]
    return map?.[texto.toLowerCase() as keyof typeof map] || 0.0
  }

  private normalize(value: number, max: number): number {
    return max > 0 ? Math.min(value / max, 1) : 0
  }

  private calculateSalaryScore(salario: number, cargoAtual: string, allEmployees: Employee[]): number {
    // Calcula score baseado na posição salarial dentro do cargo
    const sameCargo = allEmployees.filter(emp => emp.cargoAtual === cargoAtual)
    if (sameCargo.length === 0) return 0.5
    
    const salarios = sameCargo.map(emp => emp.salario).sort((a, b) => a - b)
    const position = salarios.indexOf(salario)
    return position / (salarios.length - 1) || 0.5
  }

  calcularScore(colaborador: Employee, todosColaboradores: Employee[], weights: any): number {
    const maxTempoCasa = Math.max(...todosColaboradores.map(c => c.tempoDeCasa), 1)
    const maxTempoCargo = Math.max(...todosColaboradores.map(c => c.tempoNoCargo), 1)
    
    const totalWeights = Object.values(weights).reduce((sum: number, weight: any) => sum + weight, 0)
    if (totalWeights === 0) return 0

    // Componentes do score
    const desempenhoScore = this.converterTextoParaNumero('desempenho', colaborador.desempenhoTexto)
    const tempoCargoScore = this.normalize(colaborador.tempoNoCargo, maxTempoCargo)
    const tempoCasaScore = this.normalize(colaborador.tempoDeCasa, maxTempoCasa)
    const riscoScore = this.converterTextoParaNumero('risco', colaborador.riscoPerdaTexto)
    const impactoScore = this.converterTextoParaNumero('impacto', colaborador.impactoPerdaTexto)
    const absenteismoScore = 1 - colaborador.absenteismo
    const salarioScore = this.calculateSalaryScore(colaborador.salario, colaborador.cargoAtual, todosColaboradores)
    const formacaoScore = colaborador.scoreFormacao / 100
    const diversidadeScore = colaborador.scoreDiversidade / 100
    const experienciaScore = colaborador.scoreExperiencia / 100

    const scoreBase = 
      (desempenhoScore * (weights.desempenho / totalWeights)) +
      (tempoCargoScore * (weights.tempoCargo / totalWeights)) +
      (tempoCasaScore * (weights.tempoCasa / totalWeights)) +
      (riscoScore * (weights.riscoPerda / totalWeights)) +
      (impactoScore * (weights.impactoPerda / totalWeights)) +
      (absenteismoScore * (weights.absenteismo / totalWeights)) +
      (salarioScore * (weights.salario / totalWeights)) +
      (formacaoScore * (weights.formacao / totalWeights)) +
      (diversidadeScore * (weights.diversidade / totalWeights)) +
      (experienciaScore * (weights.experiencia / totalWeights))

    // Penalidades
    const penalidadeAdvertencias = Math.min(colaborador.advertencias * 0.05, 0.20)
    const penalidadeAfastamento = Math.min(colaborador.diasAfastamento * 0.001, 0.10)
    
    const scoreComPenalidades = scoreBase * (1 - penalidadeAdvertencias - penalidadeAfastamento)
    
    return Math.round(scoreComPenalidades * 500 * 10) / 10
  }
}

// Serviço aprimorado de análise de sentimento
class EnhancedSentimentService {
  analisarSentimento(texto: string): number {
    if (!texto) return 0.5
    
    const palavrasNegativas = [
      'desmotivado', 'frustração', 'reclama', 'dificuldades', 'conflitos', 'problema',
      'insatisfeito', 'preocupado', 'estressado', 'sobrecarregado', 'não atende',
      'parcialmente', 'advertência', 'atraso', 'falta'
    ]
    
    const palavrasPositivas = [
      'excelente', 'satisfeita', 'confiável', 'dedicada', 'proativa', 'criativo', 'leal',
      'excepcional', 'excede', 'atende', 'competente', 'eficiente', 'colaborativo',
      'inovador', 'líder', 'referência'
    ]
    
    const textoLower = texto.toLowerCase()
    let scoreNegativo = 0
    let scorePositivo = 0
    
    palavrasNegativas.forEach(palavra => {
      if (textoLower.includes(palavra)) scoreNegativo += 0.15
    })
    
    palavrasPositivas.forEach(palavra => {
      if (textoLower.includes(palavra)) scorePositivo += 0.15
    })
    
    return Math.min(Math.max(scoreNegativo - scorePositivo, 0), 1)
  }
}

// Serviço aprimorado de detecção de anomalias
class EnhancedAnomalyDetectorService {
  detectarAnomaliaAbsenteismo(faltasInjustificadas: number, diasAfastamento: number): boolean {
    return faltasInjustificadas > 3 || diasAfastamento > 20
  }
  
  detectarAnomaliaPromocao(tempoUltimaPromocao: number, cargoAtual: string): boolean {
    const limites = {
      'júnior': 2,
      'pleno': 3,
      'sênior': 4
    }
    
    const limite = limites[cargoAtual.toLowerCase() as keyof typeof limites] || 3
    return tempoUltimaPromocao > limite
  }
  
  detectarAnomaliaSalarial(salario: number, cargoAtual: string, allEmployees: Employee[]): boolean {
    const sameCargo = allEmployees.filter(emp => emp.cargoAtual === cargoAtual)
    if (sameCargo.length < 2) return false
    
    const salarios = sameCargo.map(emp => emp.salario)
    const media = salarios.reduce((sum, sal) => sum + sal, 0) / salarios.length
    const desvio = Math.sqrt(salarios.reduce((sum, sal) => sum + Math.pow(sal - media, 2), 0) / salarios.length)
    
    return Math.abs(salario - media) > 2 * desvio
  }
}

// Serviço principal aprimorado
export class EnhancedDataService {
  private scoreCalculator = new EnhancedScoreCalculatorService()
  private sentimentService = new EnhancedSentimentService()
  private anomalyService = new EnhancedAnomalyDetectorService()

  async getEmployees(): Promise<Employee[]> {
    await new Promise(resolve => setTimeout(resolve, 800))

    const employees: Employee[] = csvRealData.map((record, index) => {
      const dataAdmissao = DataProcessor.parseDate(record['Data de Admissão'])
      const dataUltimaPromocao = DataProcessor.parseDate(record['Data da Última Promoção ou Reajuste'])
      const tempoDeCasa = DataProcessor.calculateTenure(dataAdmissao)
      const tempoNoCargo = DataProcessor.parseTimeInMonths(record['Tempo no cargo atual']) / 12
      const tempoUltimaPromocao = DataProcessor.calculateTimeSincePromotion(dataUltimaPromocao)
      const salario = DataProcessor.parseNumber(record['Salário'])
      const faltasInjustificadas = DataProcessor.parseNumber(record['Faltas Injustificadas / Absenteísmo'])
      const diasAfastamento = DataProcessor.parseNumber(record['Dias de Afastamento (últimos 12 meses)'])
      const numeroAdvertencias = DataProcessor.parseNumber(record['Número de Advertências nos últimos 12 meses'])

      const employee: Employee = {
        id: index + 1,
        nome: record['Nome do Colaborador'],
        matricula: record['Matrícula'],
        genero: record['Gênero'],
        racaCor: record['Raça/Cor'],
        orientacaoSexual: record['Orientação Sexual'],
        empresa: record['Empresa'],
        unidadeOrganizacional: record['Unidade Organizacional'],
        centroCustos: record['Centro de custos'],
        gestorImediato: record['Gestor Imediato'],
        cargoAtual: record['Cargo Atual'],
        tabelaSalarial: record['Tabela Salarial'],
        faixaSalarial: record['Faixa Salarial'],
        nivelSalarial: record['Nível Salarial'],
        salario,
        dataAdmissao,
        dataUltimaPromocao,
        resultadoAvaliacaoDesempenho: record['Resultado da Avaliação de Desempenho'],
        dataUltimaAvaliacao: DataProcessor.parseDate(record['Data da Última Avaliação']),
        numeroAdvertencias,
        faltasInjustificadas,
        diasAfastamento,
        probabilidadeRiscoPerda: record['Probabilidade de Risco de Perda'],
        impactoPerda: record['Impacto da Perda'],
        grauEscolaridade: record['Grau de Escolaridade'],
        cursosConcluidos: record['Cursos concluídos'],
        certificacoesRelevantes: record['Certificações relevantes'],
        idiomasFalados: record['Idiomas falados'],
        atualizacaoRecenteFormacao: DataProcessor.parseDate(record['Atualização recente (formação)']),
        tempoCargoAtual: tempoNoCargo,
        
        // Campos derivados
        area: record['Unidade Organizacional'],
        desempenhoTexto: record['Resultado da Avaliação de Desempenho'],
        riscoPerdaTexto: record['Probabilidade de Risco de Perda'],
        impactoPerdaTexto: record['Impacto da Perda'],
        tempoDeCasa,
        tempoNoCargo,
        tempoUltimaPromocao,
        absenteismo: faltasInjustificadas / 100,
        advertencias: numeroAdvertencias,
        score: 0,
        reajusteSugerido: 0,
        feedbackUltimaAvaliacao: '',
        scoreSentimento: 0,
        isAbsenteismoAnomalo: false,
        scoreExperiencia: 0,
        scoreDiversidade: 0,
        scoreFormacao: 0,
        riskFactors: [],
        strengths: []
      }

      // Calcular scores adicionais
      employee.scoreExperiencia = DataProcessor.calculateExperienceScore(tempoDeCasa, tempoNoCargo)
      employee.scoreDiversidade = DataProcessor.calculateDiversityScore(employee)
      employee.scoreFormacao = DataProcessor.calculateEducationScore(
        employee.grauEscolaridade,
        employee.cursosConcluidos,
        employee.certificacoesRelevantes
      )
      
      // Gerar feedback
      employee.feedbackUltimaAvaliacao = DataProcessor.generateFeedback(employee)
      employee.scoreSentimento = this.sentimentService.analisarSentimento(employee.feedbackUltimaAvaliacao)
      
      // Detectar anomalias
      employee.isAbsenteismoAnomalo = this.anomalyService.detectarAnomaliaAbsenteismo(
        faltasInjustificadas, 
        diasAfastamento
      )
      
      // Identificar fatores de risco e pontos fortes
      employee.riskFactors = DataProcessor.identifyRiskFactors(employee)
      employee.strengths = DataProcessor.identifyStrengths(employee)

      return employee
    })

    // Calcular scores finais
    const defaultWeights = {
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

    employees.forEach(emp => {
      emp.score = this.scoreCalculator.calcularScore(emp, employees, defaultWeights)
    })

    return employees
  }

  async analyzeEmployee(employeeId: number, analysisType: string, weights: any): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1200))

    const employees = await this.getEmployees()
    const employee = employees.find(emp => emp.id === employeeId)
    
    if (!employee) {
      throw new Error('Colaborador não encontrado')
    }

    employee.score = this.scoreCalculator.calcularScore(employee, employees, weights)

    return this.generateAdvancedAnalysis(employee, analysisType)
  }

  private generateAdvancedAnalysis(employee: Employee, analysisType: string): string {
    switch (analysisType.toLowerCase()) {
      case 'risk':
        return this.generateRiskAnalysis(employee)
      case 'impact':
        return this.generateImpactAnalysis(employee)
      case 'recognition':
        return this.generateRecognitionPlan(employee)
      case 'development':
        return this.generateDevelopmentPlan(employee)
      case 'diversity':
        return this.generateDiversityAnalysis(employee)
      default:
        return this.generateRecognitionPlan(employee)
    }
  }

  private generateRiskAnalysis(emp: Employee): string {
    const risco = emp.probabilidadeRiscoPerda.toLowerCase()
    
    let diagnostico = `<strong>🎯 Análise Completa de Risco de Saída - ${emp.nome}</strong><br><br>`
    
    diagnostico += `<div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 16px;">`
    diagnostico += `<strong>📊 Perfil do Colaborador:</strong><br>`
    diagnostico += `• <strong>Score Atual:</strong> ${emp.score.toFixed(1)}/500<br>`
    diagnostico += `• <strong>Posição:</strong> ${emp.cargoAtual} - ${emp.area}<br>`
    diagnostico += `• <strong>Tempo na Empresa:</strong> ${emp.tempoDeCasa.toFixed(1)} anos<br>`
    diagnostico += `• <strong>Salário:</strong> R$ ${emp.salario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br>`
    diagnostico += `• <strong>Última Avaliação:</strong> ${emp.desempenhoTexto}<br>`
    diagnostico += `</div>`
    
    if (risco === 'alto') {
      diagnostico += `<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin-bottom: 16px;">`
      diagnostico += `<strong style="color: #dc2626;">🚨 RISCO CRÍTICO IDENTIFICADO</strong><br>`
      diagnostico += `${emp.nome} apresenta múltiplos indicadores de alto risco que requerem <strong>ação imediata</strong>. `
      diagnostico += `A combinação de fatores sugere alta probabilidade de saída nos próximos 3-6 meses se não houver intervenção.<br>`
      diagnostico += `</div>`
    } else if (risco === 'médio') {
      diagnostico += `<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 16px;">`
      diagnostico += `<strong style="color: #d97706;">⚠️ RISCO MODERADO DETECTADO</strong><br>`
      diagnostico += `${emp.nome} mostra alguns sinais de alerta que merecem atenção preventiva. `
      diagnostico += `Intervenção proativa pode prevenir escalada para alto risco.<br>`
      diagnostico += `</div>`
    } else {
      diagnostico += `<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; margin-bottom: 16px;">`
      diagnostico += `<strong style="color: #16a34a;">✅ RISCO BAIXO - SITUAÇÃO ESTÁVEL</strong><br>`
      diagnostico += `${emp.nome} demonstra estabilidade e satisfação com a posição atual. `
      diagnostico += `Foco em manutenção e desenvolvimento contínuo.<br>`
      diagnostico += `</div>`
    }
    
    // Fatores de risco específicos
    if (emp.riskFactors && emp.riskFactors.length > 0) {
      diagnostico += `<strong>🔍 Fatores de Risco Identificados:</strong><br>`
      diagnostico += `<ul style="margin-left: 20px; margin-bottom: 16px;">`
      emp.riskFactors.forEach(factor => {
        diagnostico += `<li style="margin-bottom: 4px;">• ${factor}</li>`
      })
      diagnostico += `</ul>`
    }
    
    // Pontos fortes
    if (emp.strengths && emp.strengths.length > 0) {
      diagnostico += `<strong>💪 Pontos Fortes Identificados:</strong><br>`
      diagnostico += `<ul style="margin-left: 20px; margin-bottom: 16px;">`
      emp.strengths.forEach(strength => {
        diagnostico += `<li style="margin-bottom: 4px;">• ${strength}</li>`
      })
      diagnostico += `</ul>`
    }
    
    // Plano de ação detalhado
    diagnostico += `<strong>📋 Plano de Retenção Estratégico:</strong><br><br>`
    
    if (risco === 'alto') {
      diagnostico += `
        <div style="background: #fef2f2; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
        <strong style="color: #dc2626;">🚨 AÇÕES IMEDIATAS (Próximos 7 dias):</strong><br>
        • Reunião one-on-one urgente com gestor direto<br>
        • Avaliação completa de satisfação e expectativas<br>
        • Revisão imediata de carga de trabalho e responsabilidades<br>
        • Identificação de fatores específicos de insatisfação<br>
        </div>
        
        <div style="background: #fffbeb; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
        <strong style="color: #d97706;">⚡ MÉDIO PRAZO (Próximas 4 semanas):</strong><br>
        • Análise de adequação salarial ao mercado<br>
        • Discussão de plano de carreira personalizado<br>
        • Designação para projetos estratégicos desafiadores<br>
        • Avaliação de benefícios adicionais ou flexibilidades<br>
        </div>
        
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
        <strong style="color: #16a34a;">🎯 LONGO PRAZO (Próximos 3 meses):</strong><br>
        • Implementação de programa de mentoria ou coaching<br>
        • Avaliação de oportunidades de promoção<br>
        • Desenvolvimento de trilha de crescimento específica<br>
        • Monitoramento contínuo de satisfação<br>
        </div>
      `
    } else if (risco === 'médio') {
      diagnostico += `
        <div style="background: #fffbeb; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
        <strong style="color: #d97706;">👀 MONITORAMENTO ATIVO:</strong><br>
        • Check-ins quinzenais com gestor<br>
        • Feedback contínuo sobre performance e satisfação<br>
        • Acompanhamento de indicadores de engajamento<br>
        </div>
        
        <div style="background: #f0f9ff; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
        <strong style="color: #0284c7;">📈 DESENVOLVIMENTO:</strong><br>
        • Treinamentos alinhados aos interesses pessoais<br>
        • Projetos que ampliem responsabilidades<br>
        • Networking interno e participação em comitês<br>
        </div>
        
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
        <strong style="color: #16a34a;">🏆 RECONHECIMENTO:</strong><br>
        • Programa de reconhecimento por conquistas<br>
        • Visibilidade em projetos estratégicos<br>
        • Participação em decisões importantes<br>
        </div>
      `
    } else {
      diagnostico += `
        <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
        <strong style="color: #16a34a;">✅ MANUTENÇÃO:</strong><br>
        • Continuar práticas atuais de gestão<br>
        • Reconhecimento regular das contribuições<br>
        • Manter ambiente de trabalho positivo<br>
        </div>
        
        <div style="background: #f0f9ff; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
        <strong style="color: #0284c7;">🚀 CRESCIMENTO:</strong><br>
        • Explorar oportunidades de mentoria para outros<br>
        • Projetos de liderança ou especialização<br>
        • Desenvolvimento de competências futuras<br>
        </div>
        
        <div style="background: #fef3c7; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
        <strong style="color: #d97706;">🤝 ENGAJAMENTO:</strong><br>
        • Participação em comitês ou grupos de trabalho<br>
        • Representação da empresa em eventos<br>
        • Contribuição para cultura organizacional<br>
        </div>
      `
    }
    
    // Métricas de acompanhamento
    diagnostico += `<br><strong>📊 Métricas de Acompanhamento Sugeridas:</strong><br>`
    diagnostico += `• Score de satisfação mensal<br>`
    diagnostico += `• Frequência de feedback positivo<br>`
    diagnostico += `• Participação em atividades voluntárias<br>`
    diagnostico += `• Indicadores de engajamento em projetos<br>`
    diagnostico += `• Taxa de absenteísmo e pontualidade<br>`
    
    return diagnostico
  }

  private generateImpactAnalysis(emp: Employee): string {
    const impacto = emp.impactoPerda.toLowerCase()
    
    let analise = `<strong>🎯 Análise Detalhada de Impacto da Perda - ${emp.nome}</strong><br><br>`
    
    analise += `<div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 16px;">`
    analise += `<strong>📋 Perfil de Impacto:</strong><br>`
    analise += `• <strong>Nível de Impacto:</strong> ${emp.impactoPerda}<br>`
    analise += `• <strong>Área de Atuação:</strong> ${emp.area}<br>`
    analise += `• <strong>Experiência:</strong> ${emp.tempoDeCasa.toFixed(1)} anos na empresa<br>`
    analise += `• <strong>Especialização:</strong> ${emp.cargoAtual}<br>`
    analise += `• <strong>Score de Performance:</strong> ${emp.score.toFixed(1)}/500<br>`
    analise += `</div>`
    
    if (impacto === 'alto' || impacto === 'crítico' || impacto === 'estratégico') {
      analise += `<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin-bottom: 16px;">`
      analise += `<strong style="color: #dc2626;">🔴 IMPACTO CRÍTICO PARA A ORGANIZAÇÃO</strong><br>`
      analise += `A saída de ${emp.nome} causaria disrução significativa nas operações e estratégia organizacional.<br>`
      analise += `</div>`
      
      analise += `<strong>💼 Impactos Operacionais Detalhados:</strong><br>`
      analise += `• <strong>Projetos em Risco:</strong> Interrupção de iniciativas críticas em andamento<br>`
      analise += `• <strong>Conhecimento Especializado:</strong> Perda de ${emp.tempoDeCasa.toFixed(1)} anos de experiência institucional<br>`
      analise += `• <strong>Redistribuição de Carga:</strong> Necessidade urgente de realocação de responsabilidades<br>`
      analise += `• <strong>Cronogramas:</strong> Possível atraso em entregas estratégicas<br>`
      analise += `• <strong>Relacionamentos:</strong> Impacto em parcerias internas e externas estabelecidas<br><br>`
      
      analise += `<strong>💰 Impactos Financeiros Estimados:</strong><br>`
      analise += `• <strong>Recrutamento e Seleção:</strong> R$ 15.000 - R$ 30.000<br>`
      analise += `• <strong>Tempo de Adaptação:</strong> 4-8 meses para atingir produtividade plena<br>`
      analise += `• <strong>Perda de Produtividade:</strong> 50-70% durante período de transição<br>`
      analise += `• <strong>Treinamento do Substituto:</strong> R$ 10.000 - R$ 20.000<br>`
      analise += `• <strong>Impacto em Resultados:</strong> Possível redução de 15-25% na performance departamental<br><br>`
      
      analise += `<strong>👥 Impactos na Equipe e Cultura:</strong><br>`
      analise += `• <strong>Sobrecarga Temporária:</strong> Redistribuição de tarefas entre colegas<br>`
      analise += `• <strong>Moral da Equipe:</strong> Possível desmotivação e questionamentos<br>`
      analise += `• <strong>Perda de Mentor:</strong> Impacto no desenvolvimento de outros colaboradores<br>`
      analise += `• <strong>Conhecimento Tácito:</strong> Perda de processos e relacionamentos não documentados<br>`
      analise += `• <strong>Reestruturação:</strong> Necessidade de reorganização de processos e fluxos<br>`
      
    } else if (impacto === 'médio' || impacto === 'moderado') {
      analise += `<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 16px;">`
      analise += `<strong style="color: #d97706;">🟡 IMPACTO MODERADO - GERENCIÁVEL</strong><br>`
      analise += `A saída seria administrável com planejamento adequado, mas ainda causaria transtornos operacionais.<br>`
      analise += `</div>`
      
      analise += `<strong>📊 Análise de Impacto Moderado:</strong><br>`
      analise += `• <strong>Interrupção Temporária:</strong> Algumas atividades seriam afetadas por 2-4 semanas<br>`
      analise += `• <strong>Transferência de Conhecimento:</strong> Processo estruturado de handover necessário<br>`
      analise += `• <strong>Tempo de Recrutamento:</strong> 2-3 meses para encontrar substituto adequado<br>`
      analise += `• <strong>Custo de Substituição:</strong> R$ 8.000 - R$ 15.000<br>`
      analise += `• <strong>Impacto nos Resultados:</strong> Redução temporária de 5-10% na produtividade<br>`
      analise += `• <strong>Adaptação da Equipe:</strong> Ajustes menores na distribuição de tarefas<br>`
      
    } else {
      analise += `<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; margin-bottom: 16px;">`
      analise += `<strong style="color: #16a34a;">🟢 IMPACTO BAIXO - FACILMENTE ABSORVIDO</strong><br>`
      analise += `A saída seria facilmente gerenciada pela organização sem disruções significativas.<br>`
      analise += `</div>`
      
      analise += `<strong>✅ Cenário de Baixo Impacto:</strong><br>`
      analise += `• <strong>Substituição Rápida:</strong> 1-2 meses para reposição<br>`
      analise += `• <strong>Conhecimento Transferível:</strong> Processos bem documentados e padronizados<br>`
      analise += `• <strong>Custo Reduzido:</strong> R$ 3.000 - R$ 8.000 para substituição<br>`
      analise += `• <strong>Impacto Mínimo:</strong> Operações continuam normalmente<br>`
      analise += `• <strong>Flexibilidade:</strong> Equipe preparada para absorver responsabilidades<br>`
    }
    
    // Plano de mitigação
    analise += `<br><strong>🛡️ Plano de Mitigação de Riscos:</strong><br>`
    if (impacto === 'alto' || impacto === 'crítico') {
      analise += `• <strong>Documentação Urgente:</strong> Mapear todos os processos e conhecimentos críticos<br>`
      analise += `• <strong>Backup Imediato:</strong> Identificar e treinar substituto interno<br>`
      analise += `• <strong>Retenção Prioritária:</strong> Implementar plano de retenção agressivo<br>`
      analise += `• <strong>Sucessão:</strong> Desenvolver pipeline de talentos para a posição<br>`
    } else if (impacto === 'médio') {
      analise += `• <strong>Documentação:</strong> Formalizar processos principais<br>`
      analise += `• <strong>Cross-training:</strong> Capacitar outros membros da equipe<br>`
      analise += `• <strong>Pipeline:</strong> Manter candidatos qualificados mapeados<br>`
    } else {
      analise += `• <strong>Manutenção:</strong> Continuar processos padrão de gestão<br>`
      analise += `• <strong>Desenvolvimento:</strong> Usar como oportunidade de crescimento para outros<br>`
    }
    
    return analise
  }

  private generateRecognitionPlan(emp: Employee): string {
    const score = emp.score
    
    let plano = `<strong>🏆 Plano de Reconhecimento Personalizado - ${emp.nome}</strong><br><br>`
    
    plano += `<div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 16px;">`
    plano += `<strong>📊 Perfil de Performance:</strong><br>`
    plano += `• <strong>Score de Performance:</strong> ${score.toFixed(1)}/500<br>`
    plano += `• <strong>Classificação:</strong> ${this.getPerformanceLevel(score)}<br>`
    plano += `• <strong>Área de Atuação:</strong> ${emp.area}<br>`
    plano += `• <strong>Tempo de Contribuição:</strong> ${emp.tempoDeCasa.toFixed(1)} anos<br>`
    plano += `• <strong>Posição Salarial:</strong> ${emp.nivelSalarial} na ${emp.faixaSalarial}<br>`
    plano += `</div>`
    
    if (score >= 400) {
      plano += `<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; margin-bottom: 16px;">`
      plano += `<strong style="color: #16a34a;">🌟 TOP PERFORMER - TALENTO EXCEPCIONAL</strong><br>`
      plano += `${emp.nome} é um colaborador excepcional que merece reconhecimento especial e investimento estratégico.<br>`
      plano += `</div>`
      
      plano += `<strong>🎖️ Reconhecimentos Estratégicos Sugeridos:</strong><br>`
      plano += `• <strong>Prêmio de Excelência Anual:</strong> Reconhecimento público na empresa<br>`
      plano += `• <strong>Bônus de Performance Diferenciado:</strong> 15-25% do salário anual<br>`
      plano += `• <strong>Fast-Track de Liderança:</strong> Participação em programa executivo<br>`
      plano += `• <strong>Mentoria Reversa:</strong> Oportunidade de orientar outros talentos<br>`
      plano += `• <strong>Flexibilidade Premium:</strong> Home office, horários flexíveis, benefícios exclusivos<br>`
      plano += `• <strong>Desenvolvimento Executivo:</strong> MBA ou especialização custeada pela empresa<br><br>`
      
      plano += `<strong>🚀 Plano de Desenvolvimento de Carreira:</strong><br>`
      plano += `• <strong>Promoção Acelerada:</strong> Avaliação para próximo nível em 6-12 meses<br>`
      plano += `• <strong>Projetos Estratégicos:</strong> Liderança de iniciativas de alta visibilidade<br>`
      plano += `• <strong>Networking Executivo:</strong> Participação em eventos e conferências<br>`
      plano += `• <strong>Comitês Estratégicos:</strong> Participação em decisões organizacionais<br>`
      
    } else if (score >= 300) {
      plano += `<div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 16px; margin-bottom: 16px;">`
      plano += `<strong style="color: #0284c7;">⭐ PERFORMER SÓLIDO - CONTRIBUIÇÃO VALIOSA</strong><br>`
      plano += `${emp.nome} demonstra performance consistente e merece reconhecimento por suas contribuições.<br>`
      plano += `</div>`
      
      plano += `<strong>🎯 Reconhecimentos Sugeridos:</strong><br>`
      plano += `• <strong>Reconhecimento Mensal:</strong> Destaque em reuniões de equipe<br>`
      plano += `• <strong>Bônus de Performance:</strong> 8-15% do salário anual<br>`
      plano += `• <strong>Oportunidades de Liderança:</strong> Projetos de média complexidade<br>`
      plano += `• <strong>Desenvolvimento Técnico:</strong> Cursos e certificações relevantes<br>`
      plano += `• <strong>Flexibilidade Moderada:</strong> Benefícios adicionais conforme performance<br><br>`
      
      plano += `<strong>📈 Plano de Crescimento:</strong><br>`
      plano += `• <strong>Metas de Desenvolvimento:</strong> Objetivos claros para próximo nível<br>`
      plano += `• <strong>Mentoria Estruturada:</strong> Acompanhamento com senior<br>`
      plano += `• <strong>Cross-training:</strong> Exposição a outras áreas<br>`
      plano += `• <strong>Feedback Contínuo:</strong> Avaliações trimestrais<br>`
      
    } else {
      plano += `<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 16px;">`
      plano += `<strong style="color: #d97706;">🎯 POTENCIAL EM DESENVOLVIMENTO</strong><br>`
      plano += `${emp.nome} tem potencial e merece investimento focado em desenvolvimento e crescimento.<br>`
      plano += `</div>`
      
      plano += `<strong>🌱 Plano de Desenvolvimento Intensivo:</strong><br>`
      plano += `• <strong>Programa de Capacitação:</strong> Treinamentos específicos para gaps identificados<br>`
      plano += `• <strong>Mentoria Dedicada:</strong> Acompanhamento semanal com gestor<br>`
      plano += `• <strong>Metas Incrementais:</strong> Objetivos de melhoria específicos e mensuráveis<br>`
      plano += `• <strong>Suporte Adicional:</strong> Recursos e ferramentas para desenvolvimento<br><br>`
      
      plano += `<strong>🏅 Reconhecimento de Esforço:</strong><br>`
      plano += `• <strong>Reconhecimento por Melhorias:</strong> Celebrar progressos incrementais<br>`
      plano += `• <strong>Feedback Positivo Constante:</strong> Reforço de comportamentos desejados<br>`
      plano += `• <strong>Pequenas Conquistas:</strong> Marcos de desenvolvimento celebrados<br>`
      plano += `• <strong>Investimento em Potencial:</strong> Demonstrar confiança no crescimento<br>`
    }
    
    // Considerações específicas baseadas nos dados
    plano += `<br><strong>🎨 Considerações Específicas Personalizadas:</strong><br>`
    
    if (emp.scoreDiversidade > 60) {
      plano += `• <strong>Embaixador de Diversidade:</strong> Reconhecer contribuição para D&I organizacional<br>`
    }
    
    if (emp.scoreFormacao > 70) {
      plano += `• <strong>Especialista Técnico:</strong> Valorizar alta qualificação acadêmica e certificações<br>`
    }
    
    if (emp.certificacoesRelevantes !== 'Nenhuma') {
      plano += `• <strong>Expertise Certificada:</strong> Destacar certificações profissionais (${emp.certificacoesRelevantes})<br>`
    }
    
    if (emp.numeroAdvertencias === 0) {
      plano += `• <strong>Exemplo de Conduta:</strong> Reconhecer histórico disciplinar exemplar<br>`
    }
    
    if (emp.tempoDeCasa > 5) {
      plano += `• <strong>Veterano Leal:</strong> Celebrar dedicação e lealdade à empresa<br>`
    }
    
    // Cronograma de implementação
    plano += `<br><strong>📅 Cronograma de Implementação:</strong><br>`
    plano += `• <strong>Imediato (próximos 7 dias):</strong> Comunicação do reconhecimento<br>`
    plano += `• <strong>Curto prazo (30 dias):</strong> Implementação de benefícios e oportunidades<br>`
    plano += `• <strong>Médio prazo (90 dias):</strong> Avaliação de progresso e ajustes<br>`
    plano += `• <strong>Longo prazo (12 meses):</strong> Revisão completa e planejamento futuro<br>`
    
    return plano
  }

  private generateDevelopmentPlan(emp: Employee): string {
    let plano = `<strong>🚀 Plano de Desenvolvimento Individual - ${emp.nome}</strong><br><br>`
    
    plano += `<div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 16px;">`
    plano += `<strong>👤 Perfil Atual Detalhado:</strong><br>`
    plano += `• <strong>Cargo:</strong> ${emp.cargoAtual} (${emp.area})<br>`
    plano += `• <strong>Experiência Total:</strong> ${emp.tempoDeCasa.toFixed(1)} anos na empresa<br>`
    plano += `• <strong>Experiência no Cargo:</strong> ${emp.tempoNoCargo.toFixed(1)} anos<br>`
    plano += `• <strong>Formação:</strong> ${emp.grauEscolaridade}<br>`
    plano += `• <strong>Score Atual:</strong> ${emp.score.toFixed(1)}/500<br>`
    plano += `• <strong>Última Avaliação:</strong> ${emp.desempenhoTexto}<br>`
    plano += `</div>`
    
    plano += `<strong>🎯 Áreas de Desenvolvimento Identificadas:</strong><br><br>`
    
    // Análise baseada no desempenho
    if (emp.resultadoAvaliacaoDesempenho.toLowerCase().includes('não atende')) {
      plano += `<div style="background: #fef2f2; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
      plano += `• <strong style="color: #dc2626;">Performance Técnica Crítica:</strong> Necessita melhorar competências fundamentais do cargo<br>`
      plano += `</div>`
    } else if (emp.resultadoAvaliacaoDesempenho.toLowerCase().includes('parcialmente')) {
      plano += `<div style="background: #fffbeb; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
      plano += `• <strong style="color: #d97706;">Consistência de Performance:</strong> Desenvolver maior regularidade nos resultados<br>`
      plano += `</div>`
    }
    
    // Análise baseada no tempo sem promoção
    if (emp.tempoUltimaPromocao > 2) {
      plano += `<div style="background: #f0f9ff; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
      plano += `• <strong style="color: #0284c7;">Preparação para Liderança:</strong> Desenvolver competências para próximo nível hierárquico<br>`
      plano += `</div>`
    }
    
    // Análise baseada na formação
    if (emp.scoreFormacao < 50) {
      plano += `<div style="background: #fef3c7; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
      plano += `• <strong style="color: #d97706;">Qualificação Acadêmica:</strong> Investimento em educação formal e certificações<br>`
      plano += `</div>`
    }
    
    // Análise baseada em certificações
    if (emp.certificacoesRelevantes === 'Nenhuma') {
      plano += `<div style="background: #f0fdf4; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
      plano += `• <strong style="color: #16a34a;">Certificações Profissionais:</strong> Obtenção de credenciais relevantes para o cargo<br>`
      plano += `</div>`
    }
    
    plano += `<br><strong>📋 Plano de Ação Estruturado - Próximos 12 Meses:</strong><br><br>`
    
    plano += `<div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin-bottom: 16px;">`
    plano += `<strong style="color: #0284c7;">🎯 TRIMESTRE 1 (Meses 1-3) - DIAGNÓSTICO E FUNDAÇÃO</strong><br>`
    plano += `• <strong>Avaliação 360°:</strong> Feedback completo de pares, subordinados e superiores<br>`
    plano += `• <strong>Assessment de Competências:</strong> Mapeamento detalhado de gaps e fortalezas<br>`
    plano += `• <strong>Definição de Mentor:</strong> Designação de mentor interno experiente<br>`
    plano += `• <strong>Plano de Estudos:</strong> Início de curso/treinamento prioritário identificado<br>`
    plano += `• <strong>Metas SMART:</strong> Estabelecimento de objetivos específicos e mensuráveis<br>`
    plano += `</div>`
    
    plano += `<div style="background: #f0fdf4; padding: 16px; border-radius: 8px; margin-bottom: 16px;">`
    plano += `<strong style="color: #16a34a;">🚀 TRIMESTRE 2 (Meses 4-6) - APLICAÇÃO PRÁTICA</strong><br>`
    plano += `• <strong>Projeto Piloto:</strong> Liderança de projeto para aplicar novos conhecimentos<br>`
    plano += `• <strong>Participação Ativa:</strong> Integração em comitê ou grupo de trabalho estratégico<br>`
    plano += `• <strong>Avaliação Intermediária:</strong> Review de progresso e ajustes necessários<br>`
    plano += `• <strong>Networking Interno:</strong> Construção de relacionamentos interdepartamentais<br>`
    plano += `• <strong>Feedback Contínuo:</strong> Sessões quinzenais de acompanhamento<br>`
    plano += `</div>`
    
    plano += `<div style="background: #fffbeb; padding: 16px; border-radius: 8px; margin-bottom: 16px;">`
    plano += `<strong style="color: #d97706;">⭐ TRIMESTRE 3 (Meses 7-9) - LIDERANÇA E VISIBILIDADE</strong><br>`
    plano += `• <strong>Liderança de Iniciativa:</strong> Responsabilidade por projeto de maior complexidade<br>`
    plano += `• <strong>Certificação Profissional:</strong> Conclusão de certificação relevante ao cargo<br>`
    plano += `• <strong>Apresentação Executiva:</strong> Exposição de resultados para liderança sênior<br>`
    plano += `• <strong>Mentoria Reversa:</strong> Início de orientação a colaboradores juniores<br>`
    plano += `• <strong>Feedback 360° Intermediário:</strong> Avaliação de stakeholders internos<br>`
    plano += `</div>`
    
    plano += `<div style="background: #fef2f2; padding: 16px; border-radius: 8px; margin-bottom: 16px;">`
    plano += `<strong style="color: #dc2626;">🏆 TRIMESTRE 4 (Meses 10-12) - CONSOLIDAÇÃO E PLANEJAMENTO</strong><br>`
    plano += `• <strong>Avaliação Final Completa:</strong> Assessment abrangente de desenvolvimento<br>`
    plano += `• <strong>Discussão de Carreira:</strong> Planejamento estratégico para próximos passos<br>`
    plano += `• <strong>Plano Ano Seguinte:</strong> Definição de objetivos para próximo ciclo<br>`
    plano += `• <strong>Reconhecimento de Progresso:</strong> Celebração de conquistas alcançadas<br>`
    plano += `• <strong>Preparação para Promoção:</strong> Avaliação de prontidão para próximo nível<br>`
    plano += `</div>`
    
    // Recursos e investimentos
    plano += `<strong>💰 Investimentos e Recursos Necessários:</strong><br>`
    plano += `• <strong>Orçamento de Treinamento:</strong> R$ 5.000 - R$ 15.000 anuais<br>`
    plano += `• <strong>Tempo de Mentoria:</strong> 2-4 horas semanais<br>`
    plano += `• <strong>Certificações:</strong> R$ 2.000 - R$ 8.000 por certificação<br>`
    plano += `• <strong>Eventos e Networking:</strong> R$ 3.000 - R$ 10.000 anuais<br>`
    plano += `• <strong>Tempo de Desenvolvimento:</strong> 10-15% da carga horária semanal<br><br>`
    
    // Métricas de sucesso
    plano += `<strong>📊 Métricas de Sucesso e KPIs:</strong><br>`
    plano += `• <strong>Score de Performance:</strong> Aumento de 15-25% no score atual<br>`
    plano += `• <strong>Feedback 360°:</strong> Melhoria de 20% nas avaliações de stakeholders<br>`
    plano += `• <strong>Certificações:</strong> Obtenção de pelo menos 1 certificação relevante<br>`
    plano += `• <strong>Projetos Liderados:</strong> Conclusão bem-sucedida de 2-3 projetos<br>`
    plano += `• <strong>Prontidão para Promoção:</strong> Avaliação positiva para próximo nível<br>`
    
    return plano
  }

  private generateDiversityAnalysis(emp: Employee): string {
    let analise = `<strong>🌈 Análise Completa de Diversidade e Inclusão - ${emp.nome}</strong><br><br>`
    
    analise += `<div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 16px;">`
    analise += `<strong>👤 Perfil de Diversidade Detalhado:</strong><br>`
    analise += `• <strong>Gênero:</strong> ${emp.genero}<br>`
    analise += `• <strong>Raça/Cor:</strong> ${emp.racaCor}<br>`
    analise += `• <strong>Orientação Sexual:</strong> ${emp.orientacaoSexual}<br>`
    analise += `• <strong>Formação:</strong> ${emp.grauEscolaridade}<br>`
    analise += `• <strong>Idiomas:</strong> ${emp.idiomasFalados}<br>`
    analise += `• <strong>Score de Diversidade:</strong> ${emp.scoreDiversidade.toFixed(1)}/100<br>`
    analise += `</div>`
    
    analise += `<strong>🎯 Contribuições Específicas para D&I:</strong><br><br>`
    
    let contribuicoes = 0
    
    if (emp.genero !== 'Masculino') {
      analise += `<div style="background: #fdf2f8; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
      analise += `• <strong style="color: #be185d;">Diversidade de Gênero:</strong> Contribui para representatividade feminina na organização<br>`
      analise += `</div>`
      contribuicoes++
    }
    
    if (emp.racaCor !== 'Branca') {
      analise += `<div style="background: #fef3c7; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
      analise += `• <strong style="color: #d97706;">Diversidade Racial:</strong> Representa importante diversidade étnico-racial<br>`
      analise += `</div>`
      contribuicoes++
    }
    
    if (emp.orientacaoSexual !== 'Heterosexual') {
      analise += `<div style="background: #f0f9ff; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
      analise += `• <strong style="color: #0284c7;">Diversidade LGBTQIA+:</strong> Contribui para diversidade de orientação sexual<br>`
      analise += `</div>`
      contribuicoes++
    }
    
    if (emp.grauEscolaridade.includes('Superior') || emp.grauEscolaridade.includes('Pós')) {
      analise += `<div style="background: #f0fdf4; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
      analise += `• <strong style="color: #16a34a;">Diversidade Educacional:</strong> Traz diversidade de formação acadêmica avançada<br>`
      analise += `</div>`
      contribuicoes++
    }
    
    if (emp.idiomasFalados && emp.idiomasFalados !== 'Português') {
      analise += `<div style="background: #fef2f2; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
      analise += `• <strong style="color: #dc2626;">Diversidade Linguística:</strong> Contribui com multilinguismo (${emp.idiomasFalados})<br>`
      analise += `</div>`
      contribuicoes++
    }
    
    // Análise do nível de contribuição
    analise += `<br><div style="background: ${contribuicoes >= 3 ? '#f0fdf4' : contribuicoes >= 2 ? '#fffbeb' : '#f8fafc'}; border-left: 4px solid ${contribuicoes >= 3 ? '#22c55e' : contribuicoes >= 2 ? '#f59e0b' : '#6b7280'}; padding: 16px; margin-bottom: 16px;">`
    
    if (contribuicoes >= 3) {
      analise += `<strong style="color: #16a34a;">🌟 ALTA CONTRIBUIÇÃO PARA DIVERSIDADE</strong><br>`
      analise += `${emp.nome} representa múltiplas dimensões de diversidade, sendo um ativo estratégico para D&I organizacional.<br>`
    } else if (contribuicoes >= 2) {
      analise += `<strong style="color: #d97706;">⭐ CONTRIBUIÇÃO MODERADA PARA DIVERSIDADE</strong><br>`
      analise += `${emp.nome} contribui significativamente para diversidade em algumas dimensões importantes.<br>`
    } else {
      analise += `<strong style="color: #6b7280;">📊 CONTRIBUIÇÃO PADRÃO PARA DIVERSIDADE</strong><br>`
      analise += `${emp.nome} representa o perfil mais comum na organização, mas ainda contribui para a diversidade de pensamento.<br>`
    }
    analise += `</div>`
    
    analise += `<strong>🚀 Oportunidades de Desenvolvimento em D&I:</strong><br><br>`
    
    analise += `<div style="background: #f0f9ff; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
    analise += `• <strong>Grupos de Afinidade:</strong> Participação ou liderança em ERGs (Employee Resource Groups)<br>`
    analise += `</div>`
    
    analise += `<div style="background: #f0fdf4; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
    analise += `• <strong>Mentoria Inclusiva:</strong> Orientação para outros colaboradores diversos<br>`
    analise += `</div>`
    
    analise += `<div style="background: #fef3c7; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
    analise += `• <strong>Comitês de Diversidade:</strong> Representação em iniciativas de D&I corporativas<br>`
    analise += `</div>`
    
    analise += `<div style="background: #fdf2f8; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
    analise += `• <strong>Liderança Inclusiva:</strong> Desenvolvimento de competências de liderança inclusiva<br>`
    analise += `</div>`
    
    analise += `<div style="background: #fef2f2; padding: 12px; border-radius: 6px; margin-bottom: 8px;">`
    analise += `• <strong>Eventos de Diversidade:</strong> Participação e organização de eventos temáticos<br>`
    analise += `</div>`
    
    // Impacto organizacional
    analise += `<br><strong>🏢 Impacto Organizacional da Diversidade:</strong><br>`
    analise += `• <strong>Inovação:</strong> Perspectivas diversas contribuem para soluções criativas<br>`
    analise += `• <strong>Representatividade:</strong> Modelo para atração de talentos diversos<br>`
    analise += `• <strong>Cultura Inclusiva:</strong> Contribuição para ambiente mais acolhedor<br>`
    analise += `• <strong>Mercado:</strong> Melhor compreensão de clientes diversos<br>`
    analise += `• <strong>Compliance:</strong> Atendimento a requisitos de diversidade corporativa<br><br>`
    
    // Plano de ação específico
    analise += `<strong>📋 Plano de Ação para Maximizar Contribuição D&I:</strong><br>`
    
    if (contribuicoes >= 3) {
      analise += `• <strong>Embaixador de Diversidade:</strong> Designação como representante oficial de D&I<br>`
      analise += `• <strong>Programa de Mentoria:</strong> Liderança de programa para talentos diversos<br>`
      analise += `• <strong>Comitê Executivo:</strong> Participação em comitê de diversidade de alto nível<br>`
    } else if (contribuicoes >= 2) {
      analise += `• <strong>Líder de Grupo:</strong> Liderança de grupo de afinidade específico<br>`
      analise += `• <strong>Programa de Desenvolvimento:</strong> Participação em trilha de liderança inclusiva<br>`
    } else {
      analise += `• <strong>Aliado de Diversidade:</strong> Desenvolvimento como aliado de grupos diversos<br>`
      analise += `• <strong>Educação Inclusiva:</strong> Participação em treinamentos de viés inconsciente<br>`
    }
    
    analise += `• <strong>Networking Diverso:</strong> Participação em eventos e conferências de diversidade<br>`
    analise += `• <strong>Storytelling:</strong> Compartilhamento de experiências para inspirar outros<br>`
    
    return analise
  }

  private getPerformanceLevel(score: number): string {
    if (score >= 450) return 'Excepcional (A+)'
    if (score >= 400) return 'Excelente (A)'
    if (score >= 350) return 'Muito Bom (B+)'
    if (score >= 300) return 'Bom (B)'
    if (score >= 250) return 'Regular (C+)'
    if (score >= 200) return 'Abaixo da Média (C)'
    return 'Necessita Melhoria (D)'
  }
}