export const handleFetchError = (res: Response): Response => {
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    return res
}
