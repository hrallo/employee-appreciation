import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './icons.css'
import './globals.css'
import Header from '@/components/Header'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={[
          montserrat.className,
          'md:min-h-screen flex flex-col justify-between',
        ].join(' ')}
      >
        <Header email="shelly@shopcorporateID.com" phone={'636-227-1200'} />
        {children}
      </body>
    </html>
  )
}
