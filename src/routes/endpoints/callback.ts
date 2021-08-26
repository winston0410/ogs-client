import jwtDecode, { JwtPayload } from "jwt-decode";
import type { RequestHandler } from '@sveltejs/kit'
import type { Locals } from '$lib/types';
import env from '../../env'

const getAccessToken = async (username:string, password:string) => {
    const queryString = new URLSearchParams()
    queryString.append("grant_type", "password")
    queryString.append("username", username)
    queryString.append("password", password)
    queryString.append("client_id", env.VITE_CLIENT_ID)
    queryString.append("client_secret", env.VITE_CLIENT_SECRET)
    
    return fetch(`https://online-go.com/oauth2/token/`, {
        method: "POST",
         headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        body: queryString.toString()
    })
    .then((res) => {
       return res.json()
     })
    .catch((err) => {
       return err
    })
}

export const post: RequestHandler<Locals, FormData> = async(req) => {
    try {
    const name = req.body.get("name")
    const password = req.body.get("password")

    if (!name || !password) {
        return {
            status: 400,
            body: {
                message: "Missing username or password"
            }
        }
    }
    const { access_token, refresh_token } = await getAccessToken(name, password)

  req.locals.accessToken = access_token
  req.locals.refreshToken = refresh_token
  //  Cannot decode jwt here
  //  req.locals.user = jwtDecode<JwtPayload>(access_token)
  
  return {
    status: 302,
    headers: {
      location: '/lobby'
    }
  }
        
    } catch (error) {
      return {
          status: 500,
          body: {
              message: error
          }
      }
    }
}
