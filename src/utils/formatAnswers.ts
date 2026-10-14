import { STEPS, type AnswerValue, type Answers } from '../data/questions'

export function formatAnswer(value: AnswerValue | undefined): string {
  if (!value) return '—'

  const parts: string[] = []

  if (typeof value.selected === 'string' && value.selected) {
    parts.push(value.selected)
  } else if (Array.isArray(value.selected) && value.selected.length) {
    parts.push(value.selected.join(', '))
  }

  if (value.other?.trim()) {
    parts.push(`(+ ${value.other.trim()})`)
  }

  if (value.text?.trim()) {
    parts.push(value.text.trim())
  }

  if (value.links?.length) {
    const links = value.links
      .filter((l) => l.url.trim() || l.note.trim())
      .map((l) => [l.url, l.note].filter(Boolean).join(' — '))
    if (links.length) parts.push(links.join(' | '))
  }

  return parts.join(' ') || '—'
}

export function pick(answers: Answers, id: string): string {
  return formatAnswer(answers[id])
}

export function buildFullPayload(answers: Answers) {
  return {
    geradoEm: new Date().toISOString(),
    marca: 'MarcílioDev',
    tipo: 'Diagnóstico de Experiência Digital Premium',
    etapas: STEPS.map((step) => ({
      etapa: step.title,
      respostas: step.questions.map((q) => ({
        pergunta: q.label,
        resposta: answers[q.id] ?? null,
      })),
    })),
  }
}

export function buildEmailBody(answers: Answers): string {
  const header = [
    'Novo diagnóstico premium — MarcílioDev',
    `Data: ${new Date().toLocaleString('pt-BR')}`,
    '',
    `Empresa: ${pick(answers, 'empresa')}`,
    `Segmento: ${pick(answers, 'segmento')}`,
    `Contato do cliente: ${pick(answers, 'contato')}`,
    '',
    '——— Respostas completas ———',
    '',
  ]

  const sections = STEPS.map((step) => {
    const lines = step.questions.map(
      (q) => `${q.label}\n→ ${formatAnswer(answers[q.id])}`,
    )
    return `## ${step.number} ${step.title}\n\n${lines.join('\n\n')}`
  })

  return [...header, ...sections].join('\n\n')
}
