import type { EndpointOutput } from "@sveltejs/kit"

export const handleFetchError = (res: Response): Response => {
    if (!res.ok) {
        throw res
    }
    return res
}

//  Right now JSONResponse is not exported. Therefore the type cannot be done correctly
export type Callback<Output> = () => Promise<EndpointOutput<Output>>

export const catched = async <Output>(cb: Callback<Output>): Promise<EndpointOutput<Output>> => {
    try {
      return await cb()
    } catch (e) {
      const body = await e.json()
      return {
          status: e.status,
          body
      }
    }
}
