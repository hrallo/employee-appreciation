'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import { FC, ReactElement, useState } from 'react'

type PasswordPromptDialogProps = {}

const PasswordPromptDialog: FC<
  PasswordPromptDialogProps
> = ({}): ReactElement => {
  const [password, setPassword] = useState('')
  const [viewPassword, setViewPassword] = useState(false)
  const [passwordIncorrect, setPasswordIncorrect] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const request = await fetch(`/api`, {
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
    })

    if (request.status !== 200)
      return setPasswordIncorrect(true), setLoading(false)
    else window.location.reload()
  }

  return (
    <div className="flex items-center justify-center bg-alabaster min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-sm p-10">
        <h1 className="text-lg md:text-xl font-semibold">Password</h1>
        <h2 className="mb-6">Please enter the password to view your orders.</h2>
        <Input
          value={password}
          onSetValue={setPassword}
          label="Password"
          name="password"
          type={viewPassword ? 'text' : 'password'}
          icon={{
            name: viewPassword ? 'visibility_off' : 'visibility',
            onClick: () => setViewPassword(!viewPassword),
          }}
          error={passwordIncorrect ? 'Incorrect Password' : undefined}
          className="mb-2"
        />
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  )
}

export default PasswordPromptDialog
