'use client'
import { FC, ReactElement, useEffect, useMemo, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  ColumnDef,
  getSortedRowModel,
} from '@tanstack/react-table'
import { decodeHtmlCharCodes } from '@/utils'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import { revalidateTag } from 'next/cache'

type OrderTableProps = {
  orders: Order[]
}

const OrderTable: FC<OrderTableProps> = ({ orders }): ReactElement => {
  const [data] = useState(() => orders)
  const [sorting, setSorting] = useState<SortingState>([])
  const router = useRouter()
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string>()

  const editOrder = (id: string) => router.push(`/orders/${id}`)

  const deleteOrder = async (id: string) => {
    setShowDeleteConfirm(undefined)
    try {
      const success = await fetch(`/api/orders/id?id=${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
      }).then(res => res.json())
      console.log(success)
      setDeleteSuccess(true)
      router.refresh()
    } catch (err) {
      setDeleteSuccess(false)
    }
  }

  useEffect(() => {
    if (!deleteSuccess) return

    let timer = setTimeout(() => window?.location?.reload(), 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [deleteSuccess])

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
      {
        accessorKey: 'actions',
        cell: info => (
          <div className="flex items-center space-x-2">
            <Button
              icon="edit"
              variant="secondary"
              onClick={() => editOrder(info.row.original._id)}
            />
            <Button
              icon="delete"
              variant="secondary"
              onClick={() => setShowDeleteConfirm(info.row.original._id)}
            />
          </div>
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
      {deleteSuccess && (
        <div className="fixed right-0 bottom-0 m-4 p-4 border-r-4 border-navy bg-white text-navy rounded-sm shadow-lg min-w-[300px] font-bold">
          Order Successfully Deleted
        </div>
      )}
      {showDeleteConfirm && (
        <>
          <button
            onClick={() => setShowDeleteConfirm(undefined)}
            className="fixed flex items-center justify-center p-4 bg-black/40 top-0 right-0 left-0 bottom-0"
          ></button>
          <div className="fixed flex items-center justify-center p-4 top-0 right-0 left-0 bottom-0 pointer-events-none ">
            <div className="bg-white p-4 shadow-lg pointer-events-auto w-[90%] max-w-[600px] mx-auto text-center">
              <div className="flex justify-end">
                <Button
                  icon="close"
                  variant="secondary"
                  onClick={() => setShowDeleteConfirm(undefined)}
                />
              </div>
              <h1 className="font-semibold mt-6">
                Are you sure you want to delete this order?
              </h1>
              <div className="flex justify-center items-center space-x-2 my-6">
                <Button
                  onClick={() => setShowDeleteConfirm(undefined)}
                  variant="secondary"
                >
                  Nevermind
                </Button>
                <Button onClick={() => deleteOrder(showDeleteConfirm)}>
                  Confirm Deletion
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default OrderTable
