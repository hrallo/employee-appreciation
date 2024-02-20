'use client'
import { FC, ReactElement, ReactNode } from 'react'
import Button from './Button'

type RadioGroupProps = {
  value?: string
  className?: string
  label: string
  name: string
  choices: { value: string; label: ReactNode }[]
  onSetValue?: (value: string) => void
  spaceItems?: boolean
  displayAsButtons?: boolean
  itemsFull?: boolean
}

const RadioGroup: FC<RadioGroupProps> = ({
  value,
  onSetValue,
  label,
  name,
  className,
  choices,
  spaceItems = true,
  displayAsButtons = true,
  itemsFull,
}): ReactElement => {
  const isChecked = (val: string) => val === value

  return (
    <div className={[className].join(' ')}>
      <legend className="font-semibold mb-3">{label}</legend>

      <div className="flex flex-wrap">
        {choices.map((choice, idx) => (
          <div
            key={idx}
            className={[
              'min-w-[30%]',
              spaceItems ? 'pr-3 pb-3' : '',
              itemsFull ? 'w-full' : '',
            ].join(' ')}
          >
            <div
              className={
                displayAsButtons
                  ? 'fixed left-[-2000000px]'
                  : 'flex items-start'
              }
            >
              <input
                type="radio"
                id={`radio-${choice.value}`}
                name={name}
                value={choice.value}
                checked={isChecked(choice.value)}
                onChange={() => onSetValue?.(choice.value)}
              />
              <label htmlFor={`radio-${choice.value}`} className="ml-3">
                {choice.label}
              </label>
            </div>

            {displayAsButtons && (
              <Button
                variant={isChecked(choice.value) ? 'primary' : 'secondary'}
                onClick={() => onSetValue?.(choice.value)}
                className="w-full rounded-none"
              >
                {choice.label}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RadioGroup
