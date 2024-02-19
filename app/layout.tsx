import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './icons.css'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: process.env.METADATA_TITLE,
  description: process.env.METADATA_DESCRIPTION,
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
        {children}
      </body>
    </html>
  )
}
