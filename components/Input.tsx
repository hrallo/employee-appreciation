'use client'
import { FC, ReactElement, useState } from 'react'

type InputProps = {
  value?: string
  className?: string
  placeholder?: string
  label: string
  name: string
  onSetValue?: (value: string) => void
}

const Input: FC<InputProps> = ({
  value,
  placeholder,
  onSetValue,
  label,
  name,
  className,
}): ReactElement => {
  const [uncontrolledVal, setUncontrolledVal] = useState<string>('')

  const updateValues = (val: string) => {
    onSetValue?.(val)
    setUncontrolledVal(val)
  }

  const getValue = () => value ?? uncontrolledVal

  return (
    <div className={['flex-col flex', className].join(' ')}>
      <label htmlFor={name} className="text-xs font-semibold mb-2">
        {label}
      </label>
      <input
        type="text"
        value={getValue()}
        className={`rounded-xl shadow-forms py-3 px-6`}
        onChange={e => updateValues(e.target.value)}
        placeholder={placeholder}
        name={name}
      />
    </div>
  )
}

export default Input
