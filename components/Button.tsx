'use client'
import { FC, ReactElement, ReactNode } from 'react'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  children: ReactNode
  icon?: string
  className?: string
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  size?: 'sm' | 'lg'
  type?: 'button' | 'submit'
}

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  onClick,
  children,
  icon,
  className,
  iconPosition = 'right',
  disabled,
  size = 'sm',
  type = 'button',
}): ReactElement => {
  const variantClasses = {
    primary: [
      'border-transparent text-white bg-navy hover:bg-navy-100 focus:bg-navy-100',
    ],
    secondary: [
      'border-navy text-navy bg-white hover:bg-navy hover:text-white focus:bg-navy focus:text-white',
    ],
  }

  const disabledVariantClasses = {
    primary: ['bg-navy/40 hover:bg-navy/40 focus:bg-navy/40'],
    secondary: [''],
  }

  const sizeClass = {
    sm: 'text-xs md:text-sm',
    lg: 'text-sm md:text-base min-h-[48px]',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        `border-2 rounded-sm flex items-center font-semibold transition justify-center py-2 px-6`,
        variantClasses[variant].join(' '),
        sizeClass[size],
        iconPosition === 'right' ? '' : 'flex-row-reverse',
        className,
        disabled ? disabledVariantClasses[variant].join(' ') : '',
      ].join(' ')}
      disabled={disabled}
    >
      {children}
      {icon && (
        <span
          className={[
            'material-symbols-outlined',
            iconPosition === 'right' ? 'ml-4' : 'mr-4',
          ].join(' ')}
        >
          {icon}
        </span>
      )}
    </button>
  )
}

export default Button
