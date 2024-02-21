'use client'
import { optionsToArray } from '@/utils'
import { FC, ReactElement, useEffect } from 'react'
import RadioGroup from './RadioGroup'

type SizeRadioProps = {
  sizeString?: string
  selectedSize?: string
  setSelectedSize: (size: string) => void
}

const SizeRadio: FC<SizeRadioProps> = ({
  sizeString,
  selectedSize,
  setSelectedSize,
}): ReactElement => {
  const sizes = optionsToArray(sizeString)

  useEffect(() => {
    if (selectedSize) return
    const initialSelection = sizes?.[0]
    if (initialSelection) setSelectedSize(initialSelection)
  }, [])

  return sizes && sizes?.length > 0 ? (
    <RadioGroup
      label="Select your size:"
      name="Size"
      choices={sizes.map(opt => {
        return { label: opt, value: opt }
      })}
      value={selectedSize || sizes?.[0]}
      onSetValue={setSelectedSize}
    />
  ) : (
    <></>
  )
}

export default SizeRadio
