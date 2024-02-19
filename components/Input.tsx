'use client'
import { FC, ReactElement, useState } from 'react'

type InputProps = {
  value?: string
  className?: string
  placeholder?: string
  label: string
  name: string
  onSetValue?: (value: string) => void
  error?: string
  type?: 'text' | 'password'
  displayLabel?: boolean
  icon?: { name: string; onClick: () => void }
}

const Input: FC<InputProps> = ({
  value,
  placeholder,
  onSetValue,
  label,
  name,
  className,
  error,
  type = 'text',
  displayLabel = true,
  icon,
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
        <input
          aria-label={displayLabel ? undefined : label}
          type={type}
          value={getValue()}
          className={`rounded-xl shadow-forms py-3 px-6 w-full ${errorClass}`}
          onChange={e => updateValues(e.target.value)}
          placeholder={placeholder}
          name={name}
        />

        {icon && (
          <button
            type="button"
            className="py-2 px-4 absolute right-0 top-0 bottom-0 flex items-center justify-center"
            onClick={icon.onClick}
          >
            <span className={['material-symbols-outlined'].join(' ')}>
              {icon.name}
            </span>
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-xs pt-2">{error}</p>}
    </div>
  )
}

export default Input
