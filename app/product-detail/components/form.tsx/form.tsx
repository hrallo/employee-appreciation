'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import RadioGroup from '@/components/RadioGroup'
import { getProductTitle } from '@/utils'
import { FC, ReactElement, ReactNode, useState } from 'react'
import { find } from 'lodash'

type FormProps = {
  product: Product
  locations: Address[]
  content?: Content['acf']['order_details']
  email: string
}

const Form: FC<FormProps> = ({
  product,
  locations,
  content,
  email,
}): ReactElement => {
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
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zipcode: '',
  })
  const [name, setName] = useState<string>()
  const [selectedAddress, setSelectedAddress] = useState<Address['id']>(
    locations[0].id
  )
  const [orderPlaced, setOrderPlaced] = useState<boolean>()
  const [showConfirmOrder, setShowConfirmOrder] = useState<boolean>()

  const confirmOrder = async () => {
    setShowConfirmOrder(true)
  }

  const heading = (text: string, className?: string) => (
    <h2 className={`w-full text-xl font-semibold mb-3 ${className}`}>{text}</h2>
  )

  const wrapper = (children: ReactNode) => (
    <div className="p-6 md:p-12">{children}</div>
  )

  const selectedAddressDetails = find(locations, { id: selectedAddress })
  const showSizeWrapper = (sizes && sizes.length > 0) || product.acf.size_guide
  const [error, setError] = useState<boolean>()

  const placeOrder = async () => {
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverName: name,
          receiverEmail: email,
          product: product.title.rendered,
          size: selectedSize,
          color: selectedColor,
          isRemote: isRemote,
          shippingAddress: {
            attn: isRemote ? undefined : selectedAddressDetails?.acf.attention,
            addressName: isRemote
              ? address.name
              : selectedAddressDetails?.acf.address_name,
            addressLine1: isRemote
              ? address.line1
              : selectedAddressDetails?.acf.address_line_1,
            addressLine2: isRemote
              ? address.line2
              : selectedAddressDetails?.acf.address_line_2,
            city: isRemote ? address.city : selectedAddressDetails?.acf.city,
            stateOrProvince: isRemote
              ? address.state
              : selectedAddressDetails?.acf.state,
            zipcode: isRemote
              ? address.zipcode
              : selectedAddressDetails?.acf.zipcode,
          },
        }),
      })
      setOrderPlaced(true)
      setShowConfirmOrder(false)
    } catch (err) {
      setError(true)
    }
  }

  if (error)
    return wrapper(
      <>
        {heading('Oops! Something went wrong.')}
        <p className="text-sm md:text-base mb-10">
          We were unable to place your order. Please try again later.
        </p>
      </>
    )

  if (showConfirmOrder)
    return wrapper(
      <>
        {heading(getProductTitle(product))}
        <p className="text-sm md:text-base mb-10">
          Would you like to place this order?
        </p>

        {sizes && sizes?.length > 0 && (
          <div className="mb-10">
            <div className="font-semibold ">Selected size:</div>
            <div>{selectedSize}</div>
          </div>
        )}

        {colors && colors?.length > 0 && (
          <div className="mb-10">
            <div className="font-semibold ">Selected color:</div>
            <div>{selectedColor}</div>
          </div>
        )}

        <div className="mb-10">
          <div className="font-semibold ">Shipping:</div>
          {isRemote ? (
            <>
              <div>{address.name}</div>
              <div>{address.line1}</div>
              {address.line2 && <div>{address.line2}</div>}
              <div>
                {address.city}, {address.state} {address.zipcode}
              </div>
            </>
          ) : (
            <>
              <div>{selectedAddressDetails?.acf.address_name}</div>
              <div>{selectedAddressDetails?.acf.address_line_1}</div>
              {selectedAddressDetails?.acf.address_line_2 && (
                <div>{selectedAddressDetails?.acf.address_line_2}</div>
              )}
              <div>
                {selectedAddressDetails?.acf.city},{' '}
                {selectedAddressDetails?.acf.state}{' '}
                {selectedAddressDetails?.acf.zipcode}
              </div>
            </>
          )}
        </div>

        <div className="mb-10">
          <div className="font-semibold ">For:</div>
          {isRemote ? <div>{address.name}</div> : <div>{name}</div>}
        </div>

        <div className="flex justify-end items-center space-x-2">
          <Button
            onClick={() => {
              setShowConfirmOrder(false)
              setOrderPlaced(false)
            }}
            disabled={
              isRemote
                ? !address.line1 ||
                  !address.zipcode ||
                  !address.city ||
                  !address.state
                : !selectedAddress
            }
            variant="secondary"
          >
            Edit Order
          </Button>
          <Button
            onClick={() => {
              placeOrder()
            }}
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
    )

  if (orderPlaced)
    return wrapper(
      <>
        <div className="flex items-center justify-center my-10 text-green-700 text-[80px]">
          <span className="material-symbols-outlined">verified</span>
        </div>

        {content?.order_success_heading &&
          heading(content.order_success_heading, 'text-center')}
        {content?.order_success_description && (
          <p
            className="text-sm md:text-base mb-4 text-center"
            dangerouslySetInnerHTML={{
              __html: content?.order_success_description,
            }}
          ></p>
        )}
      </>
    )

  return wrapper(
    <>
      {heading(getProductTitle(product))}
      <p className="text-sm md:text-base mb-10">{product.acf.description}</p>
      {showSizeWrapper && (
        <div className="mb-10">
          <>
            {sizes && sizes?.length > 0 && (
              <RadioGroup
                label="Select your size:"
                name="Size"
                choices={sizes.map(opt => {
                  return { label: opt, value: opt }
                })}
                value={selectedSize}
                onSetValue={setSelectedSize}
              />
            )}
            {product.acf.size_guide && (
              <img
                src={product.acf.size_guide.sizes.large}
                alt={product.acf.size_guide.alt}
                className="mt-4"
              />
            )}
          </>
        </div>
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
        label="Are you a remote employee or work at a location not listed below?"
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
            label="Name"
            name="Name"
            value={address.name}
            onSetValue={val => {
              setAddress({ ...address, name: val })
              setName(val)
            }}
          />
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
              label="State / Province"
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
        <>
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
            className="mb-4"
          />
          <Input
            className="mb-10"
            label="Name"
            name="Name"
            value={address.name}
            onSetValue={val => {
              setAddress({ ...address, name: val })
              setName(val)
            }}
          />
        </>
      )}

      <div className="flex justify-end">
        <Button
          onClick={() => confirmOrder()}
          disabled={
            isRemote
              ? !address.name ||
                !address.line1 ||
                !address.zipcode ||
                !address.city ||
                !address.state
              : !selectedAddress || !name
          }
        >
          Continue
        </Button>
      </div>
    </>
  )
}

export default Form
