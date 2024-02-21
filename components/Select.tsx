'use client'
import { FC, ReactElement, useState } from 'react'

type SelectProps = {
  value?: string
  className?: string
  label: string
  name: string
  onSetValue?: (value: string) => void
  error?: string
  displayLabel?: boolean
  options: { label: string; value: string }[]
}

const Select: FC<SelectProps> = ({
  value,
  onSetValue,
  label,
  name,
  className,
  error,
  displayLabel = true,
  options,
}): ReactElement => {
  const [uncontrolledVal, setUncontrolledVal] = useState<string>('')

  const updateValues = (val: string) => {
    onSetValue?.(val)
    setUncontrolledVal(val)
  }

  const getValue = () => value ?? uncontrolledVal

  const errorClass = !!error ? 'border border-red-500' : ''

  return (
    <div className={['flex-col flex', className].join(' ')}>
      {displayLabel && (
        <label htmlFor={name} className="text-xs font-semibold mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          aria-label={displayLabel ? undefined : label}
          value={getValue()}
          className={`rounded-xl shadow-forms py-3 px-6 w-full ${errorClass}`}
          onChange={e => updateValues(e.target.value)}
          name={name}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500 text-xs pt-2">{error}</p>}
    </div>
  )
}

export default Select
