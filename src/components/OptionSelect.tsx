type Props = {
  options: string[]
  value: string | string[] | undefined
  multiple?: boolean
  maxSelections?: number
  onChange: (value: string | string[]) => void
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function OptionSelect({
  options,
  value,
  multiple = false,
  maxSelections,
  onChange,
}: Props) {
  const selected = multiple
    ? Array.isArray(value)
      ? value
      : []
    : typeof value === 'string'
      ? value
      : ''

  function toggle(option: string) {
    if (!multiple) {
      onChange(option)
      return
    }
    const current = Array.isArray(value) ? value : []
    if (current.includes(option)) {
      onChange(current.filter((o) => o !== option))
      return
    }
    if (maxSelections && current.length >= maxSelections) return
    onChange([...current, option])
  }

  return (
    <div className="options" role={multiple ? 'group' : 'radiogroup'}>
      <p className="role-tag role-tag--alt">Alternativas</p>
      {options.map((option, index) => {
        const isOn = multiple
          ? (selected as string[]).includes(option)
          : selected === option
        return (
          <button
            key={option}
            type="button"
            className={`option ${isOn ? 'is-on' : ''}`}
            aria-pressed={isOn}
            onClick={() => toggle(option)}
          >
            <span className="option-key" aria-hidden="true">
              {LETTERS[index] ?? index + 1}
            </span>
            <span className="option-label">{option}</span>
          </button>
        )
      })}
    </div>
  )
}
