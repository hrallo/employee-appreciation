'use client'
import { FC, ReactElement, useState } from 'react'
import Input from './Input'
import Button from './Button'
import { useRouter } from 'next/navigation'

type EmailConfirmationProps = {
  product: Product
  placeholder?: string
  shouldVerifyDomain?: boolean
}

const EmailConfirmation: FC<EmailConfirmationProps> = ({
  product,
  placeholder,
  shouldVerifyDomain,
}): ReactElement => {
  const [email, setEmail] = useState<string>('')
  const [verifyError, setVerifyError] = useState<string>()
  const router = useRouter()

  const getEmailStatus = async (): Promise<{
    canPlaceOrder: boolean
    order: Order
  }> =>
    await fetch(`/api/orders/email?email=${email}`, {
      method: 'GET',
    }).then(res => res.json())

  const getEmailDomain = (email: string) => {
    const parts = email.split('@')
    return parts[parts.length - 1]
  }

  const companyDomain = getEmailDomain(placeholder ?? 'email@domain.com')

  const isCompanyEmail = () => {
    var idx = email.lastIndexOf('@')
    return idx > -1 && email.slice(idx + 1) === companyDomain
  }

  const isValidEmail = (email?: string) =>
    email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) : false

  const verifyEmail = async () => {
    setVerifyError(undefined)

    if (shouldVerifyDomain) {
      if (!isCompanyEmail())
        return setVerifyError(`Please provide a valid company email.`)
    }

    const emailStatus = await getEmailStatus()

    emailStatus?.canPlaceOrder
      ? router.push(`/product-detail?productId=${product.id}&email=${email}`)
      : setVerifyError(
          !!emailStatus.order
            ? 'This email has already placed an order.'
            : 'Oops! Something went wrong.'
        )
  }

  return (
    <div
      id="emailConfirmation"
      className="p-6 w-full bg-alabaster sm:flex items-center justify-end"
    >
      <div className="mb-6 sm:mb-0 sm:mr-3">
        <h2 className=" text-navy text-lg md:text-xl font-semibold">
          Verify Company Email
        </h2>
      </div>
      <div className="flex-col sm:flex-row flex items-start md:justify-end flex-1">
        <Input
          name="email"
          label="Email"
          value={email}
          onSetValue={setEmail}
          placeholder={placeholder}
          className={'mb-6 sm:mb-0 flex-1 w-full sm:w-auto sm:mr-4 sm:max-w-80'}
          error={verifyError}
        />
        <Button
          onClick={verifyEmail}
          icon="arrow_forward"
          className="w-full sm:w-auto sm:mt-6"
          size="lg"
          disabled={!isValidEmail(email)}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default EmailConfirmation
