import { useEffect, useState } from 'react'
import type { Answers } from '../data/questions'

const STORAGE_KEY = 'marcilio-diagnostico-premium'

type Persisted = {
  stepIndex: number
  answers: Answers
  started: boolean
  submitted: boolean
}

const defaultState: Persisted = {
  stepIndex: 0,
  answers: {},
  started: false,
  submitted: false,
}

function load(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

export function usePersistedAnswers() {
  const [state, setState] = useState<Persisted>(() => load())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  return {
    ...state,
    setStepIndex: (stepIndex: number) =>
      setState((s) => ({ ...s, stepIndex })),
    setAnswers: (updater: Answers | ((prev: Answers) => Answers)) =>
      setState((s) => ({
        ...s,
        answers:
          typeof updater === 'function' ? updater(s.answers) : updater,
      })),
    setStarted: (started: boolean) => setState((s) => ({ ...s, started })),
    setSubmitted: (submitted: boolean) =>
      setState((s) => ({ ...s, submitted })),
    reset: () => {
      localStorage.removeItem(STORAGE_KEY)
      setState(defaultState)
    },
  }
}
