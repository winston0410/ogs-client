export const handleFetchError = (res: Response): Response => {
    if (!res.ok) {
        throw res
    }
    return res
}

export type Callback = () => Promise<Response>

export const catched = async(cb: Callback): Promise<Response|unknown> => {
    try {
        return await cb()
    } catch (e) {
      console.log('check e', e)
      return {
          status: e.status,
          body: await e.json()
      }
    }
}
