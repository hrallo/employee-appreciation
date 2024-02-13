'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import RadioGroup from '@/components/RadioGroup'
import { getProductTitle } from '@/utils'
import { useRouter } from 'next/navigation'
import { FC, ReactElement, useState } from 'react'

type FormProps = {
  product: Product
  locations: Address[]
}

const Form: FC<FormProps> = ({ product, locations }): ReactElement => {
  const router = useRouter()
  const optionsToArray = (options?: string) => {
    if (!options) return
    return options.split(',').map(opt => opt.trim())
  }

  const sizes = optionsToArray(product.acf.sizes)
  const colors = optionsToArray(product.acf.colors)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    sizes?.[0]
  )
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    colors?.[0]
  )

  const [isRemote, setIsRemote] = useState<boolean>(false)
  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    zipcode: '',
  })
  const [selectedAddress, setSelectedAddress] = useState<Address['id']>(
    locations[0].id
  )
  const [orderPlaced, setOrderPlaced] = useState<boolean>()

  const confirmOrder = () => {
    // TODO: place order
    setOrderPlaced(true)
  }

  const heading = (text: string) => (
    <h2 className="w-full text-xl font-semibold mb-3">{text}</h2>
  )

  return (
    <div className="p-6 md:p-12">
      {orderPlaced ? (
        <>
          {heading('Order Received')}
          <p className="text-sm md:text-base mb-4">
            Your item will be shipped soon. If you have any questions please
            email blank@blank.com.
          </p>
          <p className="text-sm md:text-base mb-10">
            We can’t wait to have a great 2024!
          </p>
        </>
      ) : (
        <>
          {heading(getProductTitle(product))}
          <p className="text-sm md:text-base mb-10">
            {product.acf.description}
          </p>
          {sizes && sizes?.length > 0 && (
            <RadioGroup
              label="Select your size:"
              name="Size"
              choices={sizes.map(opt => {
                return { label: opt, value: opt }
              })}
              value={selectedSize}
              onSetValue={setSelectedSize}
              className="mb-10"
            />
          )}
          {colors && colors?.length > 0 && (
            <RadioGroup
              label="Select your color:"
              name="Color"
              choices={colors.map(opt => {
                return { label: opt, value: opt }
              })}
              value={selectedColor}
              onSetValue={setSelectedColor}
              className="mb-10"
            />
          )}
          <RadioGroup
            label="Are you a remote employee?"
            name="Location"
            choices={['No', 'Yes'].map(opt => {
              return { label: opt, value: opt }
            })}
            value={isRemote ? 'Yes' : 'No'}
            onSetValue={choice => setIsRemote(choice === 'Yes')}
            spaceItems={false}
            className="mb-10"
          />
          {isRemote ? (
            <>
              <h3 className="font-semibold mb-6">Shipping Address</h3>
              <Input
                className="mb-4"
                label="Address Line 1"
                name="Address1"
                value={address.line1}
                onSetValue={val => setAddress({ ...address, line1: val })}
              />
              <Input
                className="mb-4"
                label="Address Line 2"
                name="Address2"
                value={address.line2}
                onSetValue={val => setAddress({ ...address, line2: val })}
              />
              <div className="grid grid-cols-3 gap-3 mb-10">
                <Input
                  className="flex-1 mb-3"
                  label="City"
                  name="City"
                  value={address.city}
                  onSetValue={val => setAddress({ ...address, city: val })}
                />
                <Input
                  className="flex-1 mb-3"
                  label="State"
                  name="State"
                  value={address.state}
                  onSetValue={val => setAddress({ ...address, state: val })}
                />
                <Input
                  className="flex-1 mb-3"
                  label="Zipcode"
                  name="Zipcode"
                  value={address.zipcode}
                  onSetValue={val => setAddress({ ...address, zipcode: val })}
                />
              </div>
            </>
          ) : (
            <RadioGroup
              label="Select your office location"
              name="Office Location"
              choices={locations.map(location => {
                return {
                  label: (
                    <div className="text-sm relative -top-1 pb-3">
                      <div className="font-semibold">
                        {location.acf.address_name}
                      </div>
                      <div>{location.acf.address_line_1}</div>
                      {location.acf.address_line_2 && (
                        <div>{location.acf.address_line_2}</div>
                      )}
                      <div>
                        {location.acf.city} {location.acf.state},{' '}
                        {location.acf.zipcode}
                      </div>
                    </div>
                  ),
                  value: location.id.toString(),
                }
              })}
              value={selectedAddress.toString()}
              onSetValue={val => setSelectedAddress(parseInt(val))}
              displayAsButtons={false}
              className="mb-10"
            />
          )}

          <div className="flex justify-end">
            <Button
              onClick={() => confirmOrder()}
              disabled={
                isRemote
                  ? !address.line1 ||
                    !address.zipcode ||
                    !address.city ||
                    !address.state
                  : !selectedAddress
              }
            >
              Confirm Order
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Form
