interface Props {
    [key: string]: string
}

interface PromiseTable<T> {
    [key:string]: Promise<T>
}

interface ResolvedResponse<T> {
    ok: true,
    status: number,
    value: T
}

interface RejectedResponse {
    ok: false,
    status: number,
    reason: string
}

interface UnwrappedTable<T> {
    [key:string]: ResolvedResponse<T> | RejectedResponse
}

const allPromiseSettled = <T>(t: PromiseTable<T>): Promise<UnwrappedTable<T>> => {
    const result = {}
    let index = 0
    return new Promise(resolve => {
        for (const key in t) {
            Promise.resolve(t[key])
            .then(async (res) => {
                result[key] = { ok: true, status: res.status, value: await res.json() }
                index ++
            }).catch(async (err) => {
                result[key] = { ok: false, status: err.status, reason: await err.json() }
                index ++
            }).finally(() => {
                if (index === Object.keys(t).length) {
                    resolve(result)
                }
            })
        }
    })
}

const getProps = <T>(props :Props) => async ({ fetch }) => {
    const wrapped = {}
    for (const key in props) {
        wrapped[key] = fetch(props[key])
    }
    
    const unwrapped = await allPromiseSettled<T>(wrapped)

    return { props: unwrapped };
}

export { getProps }
