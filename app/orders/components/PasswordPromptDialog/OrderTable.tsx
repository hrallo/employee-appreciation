'use client'
import { FC, ReactElement, useMemo, useReducer, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  ColumnDef,
  getSortedRowModel,
} from '@tanstack/react-table'
import { decodeHtmlCharCodes } from '@/utils'

type OrderTableProps = {
  orders: Order[]
}

const OrderTable: FC<OrderTableProps> = ({ orders }): ReactElement => {
  const [data] = useState(() => orders)
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: 'createdAt',
        header: 'Created Date',
        cell: info => (
          <>{new Date(info.row.original.createdAt).toDateString()}</>
        ),
      },
      {
        accessorKey: 'receiverEmail',
        header: () => 'Email',
      },
      {
        accessorKey: 'receiverName',
        header: () => 'Name',
      },
      {
        accessorKey: 'isRemote',
        header: () => 'Remote',
        cell: info => <>{info.row.original.isRemote && 'Remote'}</>,
      },
      {
        accessorKey: 'shippingAddress',
        header: () => 'Shipping Address',
        cell: info => (
          <>
            {info.row.original.shippingAddress.attn && (
              <div>{info.row.original?.shippingAddress.attn}</div>
            )}
            <div>{info.row.original?.shippingAddress.addressName}</div>
            <div>{info.row.original?.shippingAddress.addressLine1}</div>
            {info.row.original?.shippingAddress.addressLine2 && (
              <div>{info.row.original?.shippingAddress.addressLine2}</div>
            )}
            <div>
              {info.row.original?.shippingAddress.city},{' '}
              {info.row.original?.shippingAddress.stateOrProvince}{' '}
              {info.row.original?.shippingAddress.zipcode}
            </div>
          </>
        ),
      },
      {
        accessorKey: 'product',
        header: () => 'Product',
        cell: info => <>{decodeHtmlCharCodes(info.row.original.product)}</>,
      },
      {
        accessorKey: 'productDetails',
        header: () => 'Product Details',
        cell: info => (
          <>
            {info.row.original.size && (
              <div>Size: {info.row.original.size}</div>
            )}
            {info.row.original.color && (
              <div>Color: {info.row.original.color}</div>
            )}
          </>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="p-2 overflow-auto">
      <table className="min-w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="border">
              {headerGroup.headers.map(header => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-2 py-4"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={[
                          'flex text-sm text-semibold',
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                        ].join(' ')}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span
                          className={['material-symbols-outlined'].join(' ')}
                        >
                          {header.column.getIsSorted() === 'asc' &&
                            'expand_more'}
                          {header.column.getIsSorted() === 'desc' &&
                            'expand_less'}
                        </span>
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-1 text-xs">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}

export default OrderTable
