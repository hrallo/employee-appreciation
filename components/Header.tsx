'use client'
import Image from 'next/image'
import { FC, ReactElement, ReactNode } from 'react'

type HeaderProps = {
  logo?: WP_Image
  email?: string
  phone?: string
}

const Header: FC<HeaderProps> = ({ logo, email, phone }): ReactElement => {
  return (
    <header
      className={['flex justify-between w-full flex-wrap p-1 bg-navy'].join(
        ' '
      )}
    >
      {!!logo?.url && (
        <a href="/">
          <Image
            className="mr-4 m-1"
            src={logo.url}
            alt={logo.alt || 'Logo'}
            width={200}
            height={20}
            priority
          />
        </a>
      )}
      <div className="flex text-xs items-center text-white m-1">
        <div className="font-semibold text-gray-100 uppercase hidden md:block pr-2">
          Contact
        </div>{' '}
        {email && <a href={`mailto:${email}`}>{email}</a>}{' '}
        {email && phone && <div className="px-2">|</div>}{' '}
        {phone && <div>{phone}</div>}
      </div>
    </header>
  )
}

export default Header
