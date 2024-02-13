'use client'
import { FC, ReactElement, useState } from 'react'
import Input from './Input'
import Button from './Button'
import { useRouter } from 'next/navigation'

type EmailConfirmationProps = {
  product: Product
}

const EmailConfirmation: FC<EmailConfirmationProps> = ({
  product,
}): ReactElement => {
  const [email, setEmail] = useState<string>('')
  const router = useRouter()

  const verifyEmail = () => {
    router.push(`/product-detail?productId=${product.id}`)
  }

  return (
    <div className="p-6 fixed inset-x-0 bottom-0 bg-alabaster sm:flex items-center justify-end">
      <h2 className=" text-navy sm:text-center text-lg md:text-xl font-semibold mb-6 sm:mb-0 sm:mr-3">
        Verify Company Email
      </h2>
      <div className="flex-col sm:flex-row flex items-start sm:items-end md:justify-end flex-1">
        <Input
          name="Verify Email"
          label="Email"
          value={email}
          onSetValue={setEmail}
          placeholder="email@hussman.com"
          className="mb-6 sm:mb-0 flex-1 w-full sm:w-auto sm:mr-4 sm:max-w-80"
        />
        <Button
          onClick={verifyEmail}
          icon="arrow_forward"
          className="w-full sm:w-auto"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default EmailConfirmation
