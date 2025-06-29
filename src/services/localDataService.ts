import { Employee } from '../types'

// Dados locais simulando o CSV
const csvData = [
  {
    nome: "Lucas Martins",
    cargo: "Engenheiro de Software Sênior",
    desempenho: "Excepcional",
    risco_perda: "Alto",
    impacto_perda: "Estratégico",
    tempo_casa: 8,
    tempo_cargo: 5,
    advertencias: 0,
    feedback_ultima_avaliacao: "Lucas é uma referência técnica, mas parece desmotivado com os projetos atuais e já mencionou propostas externas. Sua perda seria crítica para o time de produto.",
    absenteismo_m12: "1,0"
  },
  {
    nome: "Ana Oliveira",
    cargo: "Gerente de Projetos Sênior",
    desempenho: "Acima do esperado",
    risco_perda: "Médio",
    impacto_perda: "Alto",
    tempo_casa: 6,
    tempo_cargo: 3,
    advertencias: 0,
    feedback_ultima_avaliacao: "Excelente gestora, cumpre todos os prazos. Reclama ocasionalmente da carga de trabalho e da falta de um plano de carreira claro.",
    absenteismo_m12: "2,6"
  },
  {
    nome: "Beatriz Costa",
    cargo: "Analista de Qualidade",
    desempenho: "Excelente",
    risco_perda: "Baixo",
    impacto_perda: "Médio",
    tempo_casa: 4,
    tempo_cargo: 4,
    advertencias: 0,
    feedback_ultima_avaliacao: "Beatriz é extremamente confiável e dedicada. Está muito satisfeita com a equipe e o ambiente de trabalho.",
    absenteismo_m12: "0,5"
  },
  {
    nome: "Carlos Silva",
    cargo: "Engenheiro de Software Sênior",
    desempenho: "Bom",
    risco_perda: "Médio",
    impacto_perda: "Alto",
    tempo_casa: 2,
    tempo_cargo: 1,
    advertencias: 1,
    feedback_ultima_avaliacao: "Carlos aprende rápido e tem grande potencial, mas precisa de mais mentoria para ganhar autonomia. A advertência foi por um atraso pontual em uma entrega.",
    absenteismo_m12: "3,1"
  },
  {
    nome: "Juliana Souza",
    cargo: "Analista de Suporte",
    desempenho: "Abaixo do esperado",
    risco_perda: "Baixo",
    impacto_perda: "Baixo",
    tempo_casa: 3,
    tempo_cargo: 2,
    advertencias: 2,
    feedback_ultima_avaliacao: "Tem apresentado dificuldades em atingir as metas de atendimento e o absenteísmo é um ponto de atenção.",
    absenteismo_m12: "9,5"
  },
  {
    nome: "Marcos Pereira",
    cargo: "Designer de Produto",
    desempenho: "Excelente",
    risco_perda: "Médio",
    impacto_perda: "Alto",
    tempo_casa: 5,
    tempo_cargo: 2,
    advertencias: 0,
    feedback_ultima_avaliacao: "Marcos é criativo e suas contribuições de design são sempre elogiadas. Ele mencionou interesse em assumir mais responsabilidades de liderança.",
    absenteismo_m12: "1,2"
  },
  {
    nome: "Fernanda Lima",
    cargo: "Analista de Dados",
    desempenho: "Acima do esperado",
    risco_perda: "Baixo",
    impacto_perda: "Médio",
    tempo_casa: 3,
    tempo_cargo: 3,
    advertencias: 0,
    feedback_ultima_avaliacao: "Muito proativa e com grande domínio técnico. É uma peça chave para a geração de relatórios estratégicos.",
    absenteismo_m12: "0,8"
  },
  {
    nome: "Ricardo Almeida",
    cargo: "Engenheiro de Software Sênior",
    desempenho: "Bom",
    risco_perda: "Alto",
    impacto_perda: "Alto",
    tempo_casa: 7,
    tempo_cargo: 3,
    advertencias: 0,
    feedback_ultima_avaliacao: "Tecnicamente muito capaz, mas tem tido conflitos de comunicação com a equipe de produto. O alto tempo no cargo pode ser um fator de risco.",
    absenteismo_m12: "4,0"
  },
  {
    nome: "Sofia Ribeiro",
    cargo: "Recrutadora Técnica",
    desempenho: "Regular",
    risco_perda: "Médio",
    impacto_perda: "Médio",
    tempo_casa: 1.5,
    tempo_cargo: 1.5,
    advertencias: 0,
    feedback_ultima_avaliacao: "Ainda está se adaptando à cultura da empresa, mas demonstra vontade de aprender. O volume de contratações tem sido um desafio.",
    absenteismo_m12: "2,5"
  },
  {
    nome: "Thiago Barros",
    cargo: "Analista Financeiro",
    desempenho: "Excepcional",
    risco_perda: "Baixo",
    impacto_perda: "Crítico",
    tempo_casa: 10,
    tempo_cargo: 6,
    advertencias: 0,
    feedback_ultima_avaliacao: "Thiago conhece todas as nuances financeiras da empresa. É extremamente leal e um pilar para o departamento.",
    absenteismo_m12: "0,1"
  },
  {
    nome: "Camila Nogueira",
    cargo: "Analista de Marketing",
    desempenho: "Bom",
    risco_perda: "Médio",
    impacto_perda: "Baixo",
    tempo_casa: 2,
    tempo_cargo: 2,
    advertencias: 1,
    feedback_ultima_avaliacao: "Entregas consistentes, mas com pouca iniciativa para inovação. Parece confortável na função atual.",
    absenteismo_m12: "3,4"
  },
  {
    nome: "Daniel Azevedo",
    cargo: "Engenheiro de Software Pleno",
    desempenho: "Acima do esperado",
    risco_perda: "Alto",
    impacto_perda: "Médio",
    tempo_casa: 2.5,
    tempo_cargo: 1,
    advertencias: 0,
    feedback_ultima_avaliacao: "Jovem talento com rápida evolução, muito cobiçado no mercado. Expressou frustração com a burocracia interna para aprovação de novas tecnologias.",
    absenteismo_m12: "2,0"
  }
]

// Serviço local de cálculo de score
class LocalScoreCalculatorService {
  private converterTextoParaNumero(tipo: string, texto: string): number {
    if (!texto) return 0.0
    
    const maps = {
      risco: { 'alto': 1.0, 'médio': 0.5, 'baixo': 0.1 },
      impacto: { 'estratégico': 1.0, 'alto': 1.0, 'crítico': 1.0, 'médio': 0.5, 'moderado': 0.5, 'baixo': 0.1 },
      desempenho: { 'excepcional': 1.0, 'acima do esperado': 0.8, 'excelente': 0.9, 'bom': 0.75, 'regular': 0.6, 'abaixo do esperado': 0.3 }
    }
    
    const map = maps[tipo as keyof typeof maps]
    return map?.[texto.toLowerCase() as keyof typeof map] || 0.0
  }

  private normalize(value: number, max: number): number {
    return max > 0 ? value / max : 0
  }

  calcularScore(colaborador: any, todosColaboradores: any[], weights: any): number {
    const maxTempoCasa = Math.max(...todosColaboradores.map(c => c.tempoDeCasa))
    const maxTempoCargo = Math.max(...todosColaboradores.map(c => c.tempoNoCargo))
    
    const totalWeights = Object.values(weights).reduce((sum: number, weight: any) => sum + weight, 0)
    if (totalWeights === 0) return 0

    const scoreBase = 
      (this.converterTextoParaNumero('desempenho', colaborador.desempenhoTexto) * (weights.desempenho / totalWeights)) +
      (this.normalize(colaborador.tempoNoCargo, maxTempoCargo) * (weights.tempoCargo / totalWeights)) +
      (this.normalize(colaborador.tempoDeCasa, maxTempoCasa) * (weights.tempoCasa / totalWeights)) +
      (this.converterTextoParaNumero('risco', colaborador.riscoPerdaTexto) * (weights.riscoPerda / totalWeights)) +
      (this.converterTextoParaNumero('impacto', colaborador.impactoPerdaTexto) * (weights.impactoPerda / totalWeights)) +
      ((1 - colaborador.absenteismo) * (weights.absenteismo / totalWeights))

    const penalidadePercentual = Math.min(colaborador.advertencias * 0.10, 0.30)
    return Math.round((scoreBase * (1 - penalidadePercentual)) * 500 * 10) / 10
  }
}

// Serviço local de análise de sentimento (simulado)
class LocalSentimentService {
  analisarSentimento(texto: string): number {
    if (!texto) return 0.5
    
    // Palavras negativas simples para simulação
    const palavrasNegativas = ['desmotivado', 'frustração', 'reclama', 'dificuldades', 'conflitos', 'problema']
    const palavrasPositivas = ['excelente', 'satisfeita', 'confiável', 'dedicada', 'proativa', 'criativo', 'leal']
    
    const textoLower = texto.toLowerCase()
    let scoreNegativo = 0
    let scorePositivo = 0
    
    palavrasNegativas.forEach(palavra => {
      if (textoLower.includes(palavra)) scoreNegativo += 0.2
    })
    
    palavrasPositivas.forEach(palavra => {
      if (textoLower.includes(palavra)) scorePositivo += 0.2
    })
    
    // Retorna score negativo (quanto maior, pior o sentimento)
    return Math.min(Math.max(scoreNegativo - scorePositivo, 0), 1)
  }
}

// Serviço local de detecção de anomalias (simulado)
class LocalAnomalyDetectorService {
  detectarAnomaliaAbsenteismo(absenteismo: number): boolean {
    // Considera anômalo se absenteísmo > 5%
    return absenteismo > 0.05
  }
}

// Serviço local de análise com IA (simulado)
class LocalLlmService {
  gerarAnalise(colaborador: Employee, analysisType: string): string {
    switch (analysisType.toLowerCase()) {
      case 'risk':
        return this.gerarAnaliseRisco(colaborador)
      case 'impact':
        return this.gerarAnaliseImpacto(colaborador)
      case 'recognition':
        return this.gerarPlanoReconhecimento(colaborador)
      default:
        return this.gerarPlanoReconhecimento(colaborador)
    }
  }

  private gerarAnaliseRisco(c: Employee): string {
    const risco = c.riscoPerdaTexto?.toLowerCase()
    let diagnostico = ''
    let plano = ''

    if (risco === 'alto') {
      diagnostico = `O colaborador ${c.nome} apresenta alto risco de perda devido a uma combinação de fatores críticos. Com score de ${c.score.toFixed(1)}, observamos sinais de desmotivação e possível interesse em oportunidades externas. O desempenho ${c.desempenhoTexto?.toLowerCase()} aliado ao tempo de ${c.tempoNoCargo.toFixed(1)} anos no cargo atual pode indicar necessidade de novos desafios.`
      
      plano = `<ul>
        <li><strong>Conversa individual imediata:</strong> Agendar reunião one-on-one para entender preocupações e expectativas</li>
        <li><strong>Plano de desenvolvimento:</strong> Criar trilha de crescimento com novos desafios técnicos e de liderança</li>
        <li><strong>Revisão salarial:</strong> Avaliar adequação da remuneração ao mercado e contribuição</li>
        <li><strong>Projeto especial:</strong> Designar para liderar iniciativa estratégica que utilize suas competências</li>
      </ul>`
    } else if (risco === 'médio') {
      diagnostico = `${c.nome} está classificado como médio risco devido a alguns fatores de atenção. Com score de ${c.score.toFixed(1)}, há oportunidades de melhoria na retenção. O desempenho ${c.desempenhoTexto?.toLowerCase()} indica potencial, mas alguns aspectos precisam de atenção.`
      
      plano = `<ul>
        <li><strong>Feedback regular:</strong> Estabelecer ciclo de feedback mensal para acompanhar satisfação</li>
        <li><strong>Capacitação:</strong> Oferecer treinamentos alinhados aos interesses de carreira</li>
        <li><strong>Reconhecimento:</strong> Implementar programa de reconhecimento por conquistas</li>
      </ul>`
    } else {
      diagnostico = `${c.nome} apresenta baixo risco de perda, demonstrando boa estabilidade e satisfação. Com score de ${c.score.toFixed(1)} e desempenho ${c.desempenhoTexto?.toLowerCase()}, o colaborador está bem alinhado com a empresa.`
      
      plano = `<ul>
        <li><strong>Manutenção:</strong> Continuar práticas atuais de gestão e reconhecimento</li>
        <li><strong>Mentoria:</strong> Considerar como mentor para novos colaboradores</li>
        <li><strong>Crescimento:</strong> Explorar oportunidades de crescimento horizontal</li>
      </ul>`
    }

    return `<p><strong>Diagnóstico do Risco</strong></p>
            <p>${diagnostico}</p>
            <p><strong>Plano de Retenção Sugerido</strong></p>
            ${plano}`
  }

  private gerarAnaliseImpacto(c: Employee): string {
    const impacto = c.impactoPerdaTexto?.toLowerCase()
    let analise = ''

    if (impacto === 'estratégico' || impacto === 'crítico' || impacto === 'alto') {
      analise = `A saída de ${c.nome} teria impacto significativo na organização. Como ${c.area}, sua experiência de ${c.tempoDeCasa.toFixed(1)} anos na empresa e conhecimento especializado são difíceis de substituir. O desempenho ${c.desempenhoTexto?.toLowerCase()} e score de ${c.score.toFixed(1)} indicam alta contribuição para resultados estratégicos. A perda resultaria em interrupção de projetos críticos, necessidade de redistribuição de responsabilidades e tempo considerável para encontrar e treinar substituto qualificado.`
    } else if (impacto === 'médio' || impacto === 'moderado') {
      analise = `A perda de ${c.nome} geraria impacto moderado nas operações. Embora seja um colaborador valioso com ${c.tempoDeCasa.toFixed(1)} anos de experiência, sua saída seria gerenciável com planejamento adequado. O conhecimento pode ser transferido e a posição preenchida em prazo razoável, mas ainda assim causaria alguma interrupção temporária nos processos.`
    } else {
      analise = `O impacto da saída de ${c.nome} seria relativamente baixo para a organização. Embora todo colaborador seja importante, a posição pode ser preenchida sem grandes disruções operacionais. O conhecimento é mais facilmente transferível e a curva de aprendizado para um substituto seria menor.`
    }

    return `<p><strong>Análise de Impacto:</strong> ${analise}</p>`
  }

  private gerarPlanoReconhecimento(c: Employee): string {
    const score = c.score
    let reconhecimento = ''
    let justificativa = ''
    let incentivo = ''

    if (score >= 400) {
      reconhecimento = `${c.nome} é um colaborador excepcional que merece reconhecimento especial. Seu desempenho ${c.desempenhoTexto?.toLowerCase()} e dedicação de ${c.tempoDeCasa.toFixed(1)} anos demonstram comprometimento exemplar com nossa organização.`
      
      justificativa = `Com score de ${score.toFixed(1)}, ${c.nome} está entre nossos top performers. Sua contribuição como ${c.area} tem sido fundamental para o sucesso da equipe, combinando excelência técnica com liderança natural.`
      
      incentivo = `Continue sendo a referência que você é! Sua trajetória inspira outros colaboradores e seu futuro na empresa é promissor. Estamos preparando oportunidades de crescimento que reconhecem seu potencial de liderança.`
    } else if (score >= 300) {
      reconhecimento = `${c.nome} é um colaborador valioso que contribui significativamente para nossos resultados. Seu desempenho ${c.desempenhoTexto?.toLowerCase()} e experiência são importantes para a equipe.`
      
      justificativa = `O score de ${score.toFixed(1)} reflete uma performance sólida e consistente. Como ${c.area}, você demonstra competência técnica e colaboração efetiva com a equipe.`
      
      incentivo = `Seu trabalho é reconhecido e valorizado. Continue desenvolvendo suas habilidades - há oportunidades de crescimento que podem elevar ainda mais sua contribuição para a empresa.`
    } else {
      reconhecimento = `${c.nome} é um membro importante da nossa equipe e reconhecemos seu potencial de crescimento. Valorizamos sua dedicação e estamos comprometidos em apoiar seu desenvolvimento.`
      
      justificativa = `Embora o score atual seja de ${score.toFixed(1)}, vemos oportunidades claras de melhoria e crescimento. Seu tempo de ${c.tempoDeCasa.toFixed(1)} anos na empresa mostra comprometimento.`
      
      incentivo = `Acreditamos no seu potencial! Com o suporte adequado e foco no desenvolvimento, você pode alcançar resultados ainda melhores. Estamos aqui para apoiar sua jornada de crescimento profissional.`
    }

    return `<p><strong>Parágrafo de Reconhecimento:</strong> ${reconhecimento}</p>
            <p><strong>Justificativa Técnica:</strong> ${justificativa}</p>
            <p><strong>Mensagem de Incentivo:</strong> ${incentivo}</p>`
  }
}

// Serviço principal que coordena tudo
export class LocalDataService {
  private scoreCalculator = new LocalScoreCalculatorService()
  private sentimentService = new LocalSentimentService()
  private anomalyService = new LocalAnomalyDetectorService()
  private llmService = new LocalLlmService()

  async getEmployees(): Promise<Employee[]> {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 500))

    const employees: Employee[] = csvData.map((record, index) => {
      const absenteismo = parseFloat(record.absenteismo_m12.replace(',', '.')) / 100
      const scoreSentimento = this.sentimentService.analisarSentimento(record.feedback_ultima_avaliacao)
      const isAbsenteismoAnomalo = this.anomalyService.detectarAnomaliaAbsenteismo(absenteismo)

      return {
        id: index + 1,
        nome: record.nome,
        area: record.cargo,
        desempenhoTexto: record.desempenho,
        riscoPerdaTexto: record.risco_perda,
        impactoPerdaTexto: record.impacto_perda,
        tempoDeCasa: record.tempo_casa,
        tempoNoCargo: record.tempo_cargo,
        absenteismo,
        advertencias: record.advertencias,
        score: 0, // Será calculado depois
        reajusteSugerido: 0,
        feedbackUltimaAvaliacao: record.feedback_ultima_avaliacao,
        scoreSentimento,
        isAbsenteismoAnomalo
      }
    })

    // Calcula scores para todos os colaboradores
    const defaultWeights = {
      desempenho: 25,
      tempoCargo: 15,
      tempoCasa: 10,
      riscoPerda: 20,
      impactoPerda: 20,
      absenteismo: 10
    }

    employees.forEach(emp => {
      emp.score = this.scoreCalculator.calcularScore(emp, employees, defaultWeights)
    })

    return employees
  }

  async analyzeEmployee(employeeId: number, analysisType: string, weights: any): Promise<string> {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 1000))

    const employees = await this.getEmployees()
    const employee = employees.find(emp => emp.id === employeeId)
    
    if (!employee) {
      throw new Error('Colaborador não encontrado')
    }

    // Recalcula score com os pesos fornecidos
    employee.score = this.scoreCalculator.calcularScore(employee, employees, weights)

    return this.llmService.gerarAnalise(employee, analysisType)
  }
}

// Para usar no futuro com Azure, descomente e configure:
/*
export class AzureDataService {
  private baseUrl = process.env.REACT_APP_API_URL || 'https://your-azure-function-app.azurewebsites.net/api'

  async getEmployees(): Promise<Employee[]> {
    const response = await fetch(`${this.baseUrl}/ranking`)
    if (!response.ok) throw new Error('Failed to fetch employees')
    return response.json()
  }

  async analyzeEmployee(employeeId: number, analysisType: string, weights: any): Promise<string> {
    const response = await fetch(`${this.baseUrl}/analyse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        colaboradorId: employeeId,
        analysisType,
        weights
      })
    })
    
    if (!response.ok) throw new Error('Failed to analyze employee')
    const result = await response.json()
    return result.analise
  }
}
*/