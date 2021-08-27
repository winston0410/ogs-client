export const handleFetchError = (res: Response): Response => {
    if (!res.ok) {
        throw res
    }
    return res
}
