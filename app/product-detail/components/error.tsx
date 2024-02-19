'use client'
import { FC, ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'

type ProductErrorProps = { message?: string }

const ProductError: FC<ProductErrorProps> = ({ message }): ReactElement => {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12 px-6 md:px-12">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl mb-5 font-semibold">Oops!</h1>
        <p className="text-base md:text-xl mb-10 max-w-[600px] mx-auto">
          {message ?? 'Could not find the product'}
        </p>
        <div className="flex justify-center">
          <Button
            icon="arrow_back"
            onClick={() => router.push('/')}
            iconPosition="left"
          >
            Home
          </Button>
        </div>
      </header>
    </main>
  )
}

export default ProductError
