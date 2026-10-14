import type { AnswerValue, Question } from '../data/questions'
import { OptionSelect } from './OptionSelect'

type Props = {
  question: Question
  value: AnswerValue | undefined
  onChange: (value: AnswerValue) => void
}

export function QuestionField({ question, value, onChange }: Props) {
  const answer = value ?? {}
  const isChoice = question.type === 'single' || question.type === 'multi'

  if (question.type === 'text' || question.type === 'textarea') {
    return (
      <div className="field-block field-block--answer">
        <p className="role-tag role-tag--question">Pergunta</p>
        <label className="field-label" htmlFor={question.id}>
          {question.label}
        </label>
        {question.hint && <p className="field-hint">{question.hint}</p>}
        <p className="role-tag role-tag--answer">Sua resposta</p>
        <div className="input-shell">
          {question.type === 'textarea' ? (
            <textarea
              id={question.id}
              className="field-input"
              placeholder={question.placeholder}
              value={answer.text ?? ''}
              rows={4}
              onChange={(e) =>
                onChange({ ...answer, text: e.target.value })
              }
            />
          ) : (
            <input
              id={question.id}
              className="field-input"
              placeholder={question.placeholder}
              value={answer.text ?? ''}
              onChange={(e) =>
                onChange({ ...answer, text: e.target.value })
              }
            />
          )}
        </div>
      </div>
    )
  }

  if (question.type === 'links') {
    const slots = question.linkSlots ?? 3
    const links = answer.links ?? Array.from({ length: slots }, () => ({
      url: '',
      note: '',
    }))

    return (
      <div className="field-block field-block--answer">
        <p className="role-tag role-tag--question">Pergunta</p>
        <p className="field-label">{question.label}</p>
        {question.hint && <p className="field-hint">{question.hint}</p>}
        <p className="role-tag role-tag--answer">Sua resposta</p>
        <div className="links-stack">
          {Array.from({ length: slots }).map((_, i) => (
            <div key={i} className="link-row">
              <span className="link-index">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="link-fields">
                <div className="input-shell">
                  <input
                    className="field-input"
                    placeholder="https://"
                    value={links[i]?.url ?? ''}
                    onChange={(e) => {
                      const next = [...links]
                      next[i] = { ...next[i], url: e.target.value }
                      onChange({ ...answer, links: next })
                    }}
                  />
                </div>
                <div className="input-shell">
                  <input
                    className="field-input"
                    placeholder="O que chama sua atenção nisso?"
                    value={links[i]?.note ?? ''}
                    onChange={(e) => {
                      const next = [...links]
                      next[i] = { ...next[i], note: e.target.value }
                      onChange({ ...answer, links: next })
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const isMulti = question.type === 'multi'

  return (
    <div
      className={`field-block ${isChoice ? 'field-block--choice' : 'field-block--answer'}`}
    >
      <p className="role-tag role-tag--question">Pergunta</p>
      <p className="field-label">{question.label}</p>
      {question.hint && <p className="field-hint">{question.hint}</p>}
      {isMulti && question.maxSelections && (
        <p className="field-meta">Até {question.maxSelections} opções</p>
      )}
      <OptionSelect
        options={question.options ?? []}
        value={answer.selected}
        multiple={isMulti}
        maxSelections={question.maxSelections}
        onChange={(selected) => onChange({ ...answer, selected })}
      />
      {question.allowOther && (
        <div className="other-block">
          <p className="role-tag role-tag--answer">Acrescentar</p>
          <label className="other-label" htmlFor={`${question.id}-other`}>
            {question.otherLabel ?? 'Algo que não está nas alternativas'}
          </label>
          <div className="input-shell">
            <input
              id={`${question.id}-other`}
              className="field-input"
              placeholder="Escreva aqui o que falta nas opções…"
              value={answer.other ?? ''}
              onChange={(e) =>
                onChange({ ...answer, other: e.target.value })
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}
