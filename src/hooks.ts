import cookie from 'cookie'
import type {Handle, GetSession} from '@sveltejs/kit'

export const handle: Handle = async ({request, resolve}) => {
  const cookies = cookie.parse(request.headers.cookie || '')

  request.locals.accessToken = cookies.accessToken
  request.locals.refreshToken = cookies.refreshToken
  request.locals.isAdmin = cookies.isAdmin
  request.locals.expiresIn = cookies.expiresIn
  request.locals.username = cookies.username
  
  const response = await resolve(request)

  const accessToken = `accessToken=${request.locals.accessToken || ''}; Path=/; Secure; HttpOnly;`
  const refreshToken = `refreshToken=${request.locals.refreshToken || ''}; Path=/; Secure; HttpOnly;`
  const isAdmin = `isAdmin=${request.locals.isAdmin || ''}; Path=/; Secure; HttpOnly;`
  const expiresIn = `expiresIn=${request.locals.expiresIn || ''}; Path=/; Secure;`
  const username = `username=${request.locals.username || ''}; Path=/; Secure;`
  
  response.headers['set-cookie'] = [accessToken, refreshToken, isAdmin, expiresIn, username]
  
  return response
}

export const getSession: GetSession = async (request) =>  {
  return {
    accessToken: request.locals.accessToken,
    refreshToken: request.locals.refreshToken,
    isAdmin: request.locals.isAdmin,
    expiresIn: request.locals.expiresIn,
    username: request.locals.username,
  }
}
