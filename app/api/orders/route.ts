import connectDB from '@/lib/conntectDB'
import order from '@/models/order'

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_TRANSPORT_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_TRANSPORT_USER,
    pass: process.env.EMAIL_TRANSPORT_PASSWORD,
  },
})

export async function POST(request: Request) {
  const body: Order = await request.json()

  if (!body.receiverEmail)
    return new Response('Missing order email', {
      status: 401,
    })

  await connectDB()
  const newOrder = new order(body)
  await newOrder.save()

  const confirmToUserHtml = `
    <div style='margin-bottom:20px;'>Thanks for placing an order. We will ship soon!</div>
    <div style='margin-bottom:20px;'>Product: ${body.product}</div>
    ${
      body.size
        ? `<div style='margin-bottom:20px;'>Size: ${body.size}</div>`
        : ''
    }
    ${
      body.color
        ? `<div style='margin-bottom:20px;'>Color: ${body.color}</div>`
        : ''
    }
    <div>Shipping Address:</div>
    ${
      body.shippingAddress.attn ? `<div>${body.shippingAddress.attn}</div>` : ''
    }
    <div>${body.shippingAddress.addressName}</div>
    <div>${body.shippingAddress.addressLine1}</div>
    ${
      body.shippingAddress.addressLine2
        ? `<div>${body.shippingAddress.addressLine2}</div>`
        : ''
    }
    <div>${body.shippingAddress.city}, ${
    body.shippingAddress.stateOrProvince
  } ${body.shippingAddress.zipcode}</div>`

  await transporter.sendMail({
    from: process.env.EMAIL_FROM, // sender address
    to: body.receiverEmail, // list of receivers
    subject: 'Employee Appreciation Order Received',
    html: confirmToUserHtml,
  })

  const confirmToBuisnessHtml = `
    <div style='margin-bottom:20px;'>Name: ${body.receiverName}</div>
    <div style='margin-bottom:20px;'>Email: ${body.receiverEmail}</div>
    <div style='margin-bottom:20px;'>Product: ${body.product}</div>
    ${
      body.size
        ? `<div style='margin-bottom:20px;'>Size: ${body.size}</div>`
        : ''
    }
    ${
      body.color
        ? `<div style='margin-bottom:20px;'>Color: ${body.color}</div>`
        : ''
    }
    <div style='margin-bottom:20px;'>Remote: ${
      body.isRemote ? 'Yes' : 'No'
    }</div>
    <div>Shipping Address:</div>
    ${
      body.shippingAddress.attn ? `<div>${body.shippingAddress.attn}</div>` : ''
    }
    <div>${body.shippingAddress.addressName}</div>
    <div>${body.shippingAddress.addressLine1}</div>
    ${
      body.shippingAddress.addressLine2
        ? `<div>${body.shippingAddress.addressLine2}</div>`
        : ''
    }
    <div style='margin-bottom:20px;'>${body.shippingAddress.city}, ${
    body.shippingAddress.stateOrProvince
  } ${body.shippingAddress.zipcode}</div>
  <div><a href="${process.env.SITE_URL}/orders?${
    process.env.SEARCH_QUERY_NAME
  }=${process.env.PAGE_PASSWORD}">View Orders<a/></div>`

  await transporter.sendMail({
    from: process.env.EMAIL_FROM, // sender address
    to: process.env.EMAIL_FROM, // list of receivers
    subject: 'New Order For Hussmann Employee Appreciation',
    text: `A new order was placed by ${body.receiverName} for ${body.product}.`, // plain text body
    html: confirmToBuisnessHtml,
  })

  return Response.json({ newOrder })
}

export async function GET(request: Request) {
  await connectDB()
  const orders = await order.find()
  return Response.json(orders)
}
