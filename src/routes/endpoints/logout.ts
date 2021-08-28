import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async (req) => {
  req.locals.accessToken = null
  req.locals.refreshToken = null
  req.locals.isAdmin = null

  return {
    status: 302,
    headers: {
      location: '/'
    }
  }
}
