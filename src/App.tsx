import { useEffect, useMemo, useState } from 'react'
import { QuestionField } from './components/QuestionField'
import { STEPS, type AnswerValue } from './data/questions'
import { usePersistedAnswers } from './hooks/usePersistedAnswers'
import { NOTIFY_EMAIL, sendDiagnosticoEmail } from './utils/emailNotify'
import { buildFullPayload } from './utils/formatAnswers'

type MailStatus = 'idle' | 'sending' | 'sent' | 'error'

function downloadAnswers(answers: Record<string, AnswerValue>) {
  const payload = buildFullPayload(answers)
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `diagnostico-marcilio-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export default function App() {
  const {
    stepIndex,
    answers,
    started,
    submitted,
    setStepIndex,
    setAnswers,
    setStarted,
    setSubmitted,
    reset,
  } = usePersistedAnswers()

  const [entering, setEntering] = useState(true)
  const [mailStatus, setMailStatus] = useState<MailStatus>('idle')
  const [mailError, setMailError] = useState('')

  useEffect(() => {
    setEntering(true)
    const t = window.setTimeout(() => setEntering(false), 40)
    return () => window.clearTimeout(t)
  }, [stepIndex, started, submitted])

  const step = STEPS[stepIndex]
  const progress = useMemo(
    () => ((stepIndex + 1) / STEPS.length) * 100,
    [stepIndex],
  )

  function updateAnswer(id: string, value: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  async function finishAndEmail() {
    setMailStatus('sending')
    setMailError('')
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const result = await sendDiagnosticoEmail(answers)
    if (result.ok) {
      setMailStatus('sent')
    } else {
      setMailStatus('error')
      setMailError(result.error)
    }
  }

  function next() {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    void finishAndEmail()
  }

  function back() {
    if (stepIndex === 0) return
    setStepIndex(stepIndex - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function resendEmail() {
    setMailStatus('sending')
    setMailError('')
    const result = await sendDiagnosticoEmail(answers)
    if (result.ok) {
      setMailStatus('sent')
    } else {
      setMailStatus('error')
      setMailError(result.error)
    }
  }

  if (!started) {
    return (
      <div className="page">
        <div className="grain" aria-hidden="true" />
        <header className="topbar">
          <span className="brand">MarcílioDev</span>
          <span className="topbar-meta">Diagnóstico · 12–18 min</span>
        </header>

        <main className={`hero ${entering ? 'is-enter' : 'is-ready'}`}>
          <p className="eyebrow">Descoberta estratégica · Direção criativa</p>
          <h1 className="hero-brand">MarcílioDev</h1>
          <p className="hero-title">
            Diagnóstico para montar
            <br />
            sua experiência digital premium
          </p>
          <p className="hero-lead">
            Responda sobre o negócio, o cliente e a sensação que a marca deve
            criar. Você escolhe entre alternativas e pode acrescentar o que
            quiser — sem precisar entender de UX ou design.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary group"
              onClick={() => setStarted(true)}
            >
              <span>Começar diagnóstico</span>
              <span className="btn-icon" aria-hidden="true">
                →
              </span>
            </button>
            {Object.keys(answers).length > 0 && (
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setStarted(true)}
              >
                Continuar de onde parei
              </button>
            )}
          </div>
          <ul className="hero-steps">
            {STEPS.map((s) => (
              <li key={s.id}>
                <span>{s.number}</span>
                {s.title}
              </li>
            ))}
          </ul>
        </main>
      </div>
    )
  }

  if (submitted) {
    const statusCopy =
      mailStatus === 'sending'
        ? `Enviando o diagnóstico para ${NOTIFY_EMAIL}…`
        : mailStatus === 'sent'
          ? `Pronto. O diagnóstico foi enviado para ${NOTIFY_EMAIL}.`
          : mailStatus === 'error'
            ? `Não foi possível enviar agora. ${mailError}`
            : `O diagnóstico será enviado para ${NOTIFY_EMAIL}.`

    return (
      <div className="page">
        <div className="grain" aria-hidden="true" />
        <header className="topbar">
          <span className="brand">MarcílioDev</span>
          <span className="topbar-meta">Diagnóstico enviado</span>
        </header>
        <main className={`done ${entering ? 'is-enter' : 'is-ready'}`}>
          <p className="eyebrow">Próxima etapa</p>
          <h1 className="done-title">Obrigado. Sua visão foi registrada.</h1>
          <p className="done-lead">{statusCopy}</p>
          {mailStatus === 'sent' && (
            <p className="done-note">
              Na primeira vez, o FormSubmit manda um e-mail de ativação para{' '}
              {NOTIFY_EMAIL}. Confirme o link para começar a receber os
              diagnósticos.
            </p>
          )}
          <div className="done-actions">
            {mailStatus === 'sending' && (
              <button type="button" className="btn-primary group" disabled>
                <span>Enviando…</span>
                <span className="btn-icon" aria-hidden="true">
                  →
                </span>
              </button>
            )}
            {(mailStatus === 'error' || mailStatus === 'sent') && (
              <button
                type="button"
                className="btn-primary group"
                onClick={() => void resendEmail()}
              >
                <span>
                  {mailStatus === 'error'
                    ? 'Tentar enviar de novo'
                    : 'Reenviar e-mail'}
                </span>
                <span className="btn-icon" aria-hidden="true">
                  →
                </span>
              </button>
            )}
            <button
              type="button"
              className="btn-ghost"
              onClick={() => downloadAnswers(answers)}
            >
              Baixar respostas (JSON)
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                setMailStatus('idle')
                setMailError('')
                reset()
              }}
            >
              Novo diagnóstico
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <span className="brand">MarcílioDev</span>
        <span className="step-chip" aria-current="step">
          <span className="step-chip-label">Etapa atual</span>
          <span className="step-chip-value">
            {step.number} · {step.title}
          </span>
        </span>
      </header>

      <div className="progress-wrap" aria-hidden="true">
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">
          {stepIndex + 1} de {STEPS.length}
        </span>
      </div>

      <main className={`wizard ${entering ? 'is-enter' : 'is-ready'}`}>
        <aside className="wizard-side">
          <p className="eyebrow">Você está em</p>
          <h1 className="wizard-title">{step.title}</h1>
          <p className="wizard-sub">{step.subtitle}</p>
          <ol className="step-rail">
            {STEPS.map((s, i) => (
              <li
                key={s.id}
                className={
                  i === stepIndex
                    ? 'is-current'
                    : i < stepIndex
                      ? 'is-done'
                      : 'is-todo'
                }
              >
                <button
                  type="button"
                  disabled={i > stepIndex}
                  onClick={() => {
                    if (i <= stepIndex) setStepIndex(i)
                  }}
                >
                  <span className="step-rail-num">{s.number}</span>
                  <span className="step-rail-title">{s.title}</span>
                </button>
              </li>
            ))}
          </ol>
          <p className="side-note">
            Não existem respostas certas ou erradas. Prefira suas próprias
            palavras. Em qualquer pergunta com opções, use “acrescentar” para
            incluir o que faltou.
          </p>
        </aside>

        <section className="wizard-form">
          {step.questions.map((q) => (
            <QuestionField
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={(value) => updateAnswer(q.id, value)}
            />
          ))}

          <div className="form-nav">
            <button
              type="button"
              className="btn-ghost"
              onClick={back}
              disabled={stepIndex === 0 || mailStatus === 'sending'}
            >
              Voltar
            </button>
            <button
              type="button"
              className="btn-primary group"
              onClick={next}
              disabled={mailStatus === 'sending'}
            >
              <span>
                {stepIndex === STEPS.length - 1
                  ? mailStatus === 'sending'
                    ? 'Enviando…'
                    : 'Concluir e enviar'
                  : 'Próxima etapa'}
              </span>
              <span className="btn-icon" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
