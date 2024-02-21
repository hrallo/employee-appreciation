'use client'

import Button from '@/components/Button'
import ColorRadio from '@/components/ColorRadio'
import Input from '@/components/Input'
import RadioGroup from '@/components/RadioGroup'
import Select from '@/components/Select'
import SizeRadio from '@/components/SizeRadio'
import { getProductTitle } from '@/utils'
import { find } from 'lodash'
import { useRouter } from 'next/navigation'
import { FC, ReactElement, useState } from 'react'

type EditOrderProps = {
  order: Order
  products?: Product[]
}

const EditOrder: FC<EditOrderProps> = ({
  order,
  products = [],
}): ReactElement => {
  const [editedOrder, setEditedOrder] = useState<Order>(order)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<boolean>()
  const router = useRouter()

  const selectedProduct = (title: string = editedOrder.product) =>
    find(products || [], product => getProductTitle(product) === title)

  const handleSubmit = async (e: React.FormEvent) => {
    setError(undefined)
    e.preventDefault()
    setLoading(true)
    const request = await fetch(`/api/orders/id?id=${order._id}`, {
      body: JSON.stringify(editedOrder),
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    })

    if (request.status !== 200)
      return (
        setError('We are having trouble saving your order.'), setLoading(false)
      )
    else setSuccess(true)

    setLoading(false)
    router.refresh()
  }

  return (
    <>
      <Button
        icon="arrow_back"
        iconPosition="left"
        className="mb-4"
        onClick={() => router.push('/orders')}
      >
        Back
      </Button>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm p-4 sm:p-10 w-[600px] mx-auto max-w-[100%] space-y-4"
      >
        <h1 className="text-lg md:text-xl font-semibold">Edit Order</h1>
        <Select
          label="Product"
          value={editedOrder.product}
          name="product"
          onSetValue={product => setEditedOrder({ ...editedOrder, product })}
          options={products?.map(product => {
            return {
              label: getProductTitle(product),
              value: getProductTitle(product),
            }
          })}
        />
        <Input
          value={editedOrder.receiverName}
          onSetValue={receiverName =>
            setEditedOrder({ ...editedOrder, receiverName })
          }
          label="Receiver Name"
          name="Receiver Name"
          className="mb-2"
        />
        <Input
          value={editedOrder.receiverEmail}
          onSetValue={receiverEmail =>
            setEditedOrder({ ...editedOrder, receiverEmail })
          }
          label="Receiver Email"
          name="Receiver Email"
          className="mb-2"
        />
        <SizeRadio
          selectedSize={editedOrder.size}
          sizeString={selectedProduct()?.acf.sizes}
          setSelectedSize={size => setEditedOrder({ ...editedOrder, size })}
        />
        <ColorRadio
          selectedColor={editedOrder.color}
          colorString={selectedProduct()?.acf.colors}
          setSelectedColor={color => setEditedOrder({ ...editedOrder, color })}
        />
        <RadioGroup
          label="Remote"
          name="isRemote"
          choices={['No', 'Yes'].map(opt => {
            return { label: opt, value: opt }
          })}
          value={editedOrder.isRemote ? 'Yes' : 'No'}
          onSetValue={choice =>
            setEditedOrder({ ...editedOrder, isRemote: choice === 'Yes' })
          }
          spaceItems={false}
          className="mb-10"
        />

        <h3 className="font-semibold mb-6">Shipping Address</h3>
        <Input
          className="mb-4"
          label="ATTN"
          name="Attn"
          value={editedOrder.shippingAddress.attn}
          onSetValue={attn =>
            setEditedOrder({
              ...editedOrder,
              shippingAddress: { ...editedOrder.shippingAddress, attn },
            })
          }
        />
        <Input
          className="mb-4"
          label="Name"
          name="Name"
          value={editedOrder.shippingAddress.addressName}
          onSetValue={addressName =>
            setEditedOrder({
              ...editedOrder,
              shippingAddress: { ...editedOrder.shippingAddress, addressName },
            })
          }
        />
        <Input
          className="mb-4"
          label="Address Line 1"
          name="Address1"
          value={editedOrder.shippingAddress.addressLine1}
          onSetValue={addressLine1 =>
            setEditedOrder({
              ...editedOrder,
              shippingAddress: { ...editedOrder.shippingAddress, addressLine1 },
            })
          }
        />
        <Input
          className="mb-4"
          label="Address Line 2"
          name="Address2"
          value={editedOrder.shippingAddress.addressLine2}
          onSetValue={addressLine2 =>
            setEditedOrder({
              ...editedOrder,
              shippingAddress: { ...editedOrder.shippingAddress, addressLine2 },
            })
          }
        />
        <div className="grid grid-cols-3 gap-3 mb-10">
          <Input
            className="flex-1 mb-3"
            label="City"
            name="City"
            value={editedOrder.shippingAddress.city}
            onSetValue={city =>
              setEditedOrder({
                ...editedOrder,
                shippingAddress: { ...editedOrder.shippingAddress, city },
              })
            }
          />
          <Input
            className="flex-1 mb-3"
            label="State / Province"
            name="State"
            value={editedOrder.shippingAddress.stateOrProvince}
            onSetValue={stateOrProvince =>
              setEditedOrder({
                ...editedOrder,
                shippingAddress: {
                  ...editedOrder.shippingAddress,
                  stateOrProvince,
                },
              })
            }
          />
          <Input
            className="flex-1 mb-3"
            label="Zipcode"
            name="Zipcode"
            value={editedOrder.shippingAddress.zipcode}
            onSetValue={zipcode =>
              setEditedOrder({
                ...editedOrder,
                shippingAddress: { ...editedOrder.shippingAddress, zipcode },
              })
            }
          />
        </div>

        <div className="flex-col flex items-end justify-end">
          <Button
            type="submit"
            disabled={
              loading ||
              !editedOrder.product ||
              !editedOrder.receiverEmail ||
              !editedOrder.receiverEmail ||
              !editedOrder.shippingAddress.addressLine1 ||
              !editedOrder.shippingAddress.stateOrProvince ||
              !editedOrder.shippingAddress.zipcode ||
              !editedOrder.shippingAddress.city
            }
          >
            Save Updates
          </Button>
          {error && <p className="text-red-500 text-xs pt-2">{error}</p>}
          {success && (
            <p className="text-green-500 text-xs pt-2">
              Order updated successfully
            </p>
          )}
        </div>
      </form>
    </>
  )
}

export default EditOrder
