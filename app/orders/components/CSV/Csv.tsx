'use client'
import { decodeHtmlCharCodes } from '@/utils'
import { FC, ReactElement, useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'

type CsvProps = {
  orders: Order[]
}

const Csv: FC<CsvProps> = ({ orders }): ReactElement => {
  const [loading, setLoading] = useState(true)

  const csvData = orders.map(order => {
    return {
      createdAt: new Date(order.createdAt).toDateString(),
      receiverEmail: order.receiverEmail,
      receiverName: order.receiverName,
      isRemote: order.isRemote,
      shippingAddress: Object.values(order.shippingAddress).join(' '),
      product: decodeHtmlCharCodes(order.product),
      color: order.color,
      size: order.size,
    }
  })

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) return <></>

  return (
    <CSVLink
      data={csvData}
      filename={'Employee Appreciation Orders.csv'}
      className="text-sm border-2 rounded-sm flex items-center font-semibold transition justify-center py-2 px-6 border-transparent text-white bg-navy hover:bg-navy-100 focus:bg-navy-100"
    >
      Export to CSV
    </CSVLink>
  )
}

export default Csv
