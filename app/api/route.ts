import { serialize } from 'cookie'

export async function POST(request: Request, params: { slug: string }) {
  const data: { password: string } = await request.json()
  const password = data.password
  const cookie = serialize(process.env.PASSWORD_COOKIE_NAME!, 'true', {
    httpOnly: true,
    path: '/',
  })

  if (process.env.PAGE_PASSWORD !== password) {
    return new Response('Password Incorrect', {
      status: 401,
    })
  }

  return new Response('Password Correct', {
    status: 200,
    headers: {
      'Set-Cookie': cookie,
    },
  })
}
