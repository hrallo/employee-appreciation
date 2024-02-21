'use client'
import { optionsToArray } from '@/utils'
import { FC, ReactElement, useEffect } from 'react'
import RadioGroup from './RadioGroup'

type ColorRadioProps = {
  colorString?: string
  selectedColor?: string
  setSelectedColor: (color: string) => void
}

const ColorRadio: FC<ColorRadioProps> = ({
  colorString,
  selectedColor,
  setSelectedColor,
}): ReactElement => {
  const colors = optionsToArray(colorString)

  useEffect(() => {
    if (selectedColor) return
    const initialSelection = colors?.[0]
    if (initialSelection) setSelectedColor(initialSelection)
  }, [])

  return colors && colors?.length > 0 ? (
    <RadioGroup
      label="Select your Color:"
      name="Color"
      choices={colors.map(opt => {
        return { label: opt, value: opt }
      })}
      value={selectedColor || colors?.[0]}
      onSetValue={setSelectedColor}
    />
  ) : (
    <></>
  )
}

export default ColorRadio
