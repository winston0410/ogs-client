import cookie from 'cookie'
import type {Handle, GetSession} from '@sveltejs/kit'

export const handle: Handle = async ({request, resolve}) => {
  const cookies = cookie.parse(request.headers.cookie || '')

  request.locals.accessToken = cookies.accessToken
  request.locals.refreshToken = cookies.refreshToken
  request.locals.isAdmin = cookies.isAdmin
  
  const response = await resolve(request)

  const accessToken = `accessToken=${request.locals.accessToken || ''}; Path=/; Secure; HttpOnly;`
  const refreshToken = `refreshToken=${request.locals.refreshToken || ''}; Path=/; Secure; HttpOnly;`
  const isAdmin = `isAdmin=${request.locals.isAdmin || ''}; Path=/; Secure; HttpOnly;`

  response.headers['set-cookie'] = [accessToken, refreshToken, isAdmin]
  
  return response
}

export const getSession: GetSession = async (request) =>  {
  return {
    accessToken: request.locals.accessToken,
    refreshToken: request.locals.refreshToken,
    isAdmin: request.locals.isAdmin
  }
}
