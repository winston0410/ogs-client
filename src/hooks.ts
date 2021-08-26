import cookie from 'cookie'

export async function handle({request, resolve}) {
  const cookies = cookie.parse(request.headers.cookie || '')

  // code here happends before the endpoint or page is called
  request.locals.accessToken = cookies.accessToken
  request.locals.refreshToken = cookies.refreshToken
  request.locals.user = cookies.user

  const response = await resolve(request)

  response.headers['set-cookie'] = `accessToken=${request.locals.accessToken || ''}; Path=/; HttpOnly`
  
  return response
}

export async function getSession(request) {
  return {
    accessToken: request.locals.accessToken,
    refreshToken: request.locals.refreshToken,
    user: request.locals.user
  }
}
