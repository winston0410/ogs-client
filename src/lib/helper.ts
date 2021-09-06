import { handleFetchError } from '$lib/fetch';

interface Props {
	[key: string]: string;
}

interface PromiseTable<T> {
	[key: string]: Promise<T>;
}

export interface ResolvedResponse<T> {
	ok: true;
	status: number;
	value: T;
}

export interface RejectedResponse {
	ok: false;
	status: number;
	reason: string;
}

interface UnwrappedTable<T> {
	[key: string]: ResolvedResponse<T> | RejectedResponse;
}

export type IFetch = (info: RequestInfo, init?: RequestInit) => Promise<Response>;

export const allFetchSettled = <T>(t: PromiseTable<Response>): Promise<UnwrappedTable<T>> => {
	const result = {};
	let index = 0;
	return new Promise((resolve) => {
		for (const key in t) {
			Promise.resolve(t[key])
                .then(handleFetchError)
				.then(async (res) => {
					result[key] = { ok: true, status: res.status, value: await res.json() };
					index++;
				})
				.catch(async (err) => {
					result[key] = { ok: false, status: err.status, reason: err };
					index++;
				})
				.finally(() => {
					if (index === Object.keys(t).length) {
						resolve(result);
					}
				});
		}
	});
};

//  fetch in batch and return an object for props in sveltekit
export const batchFetch = async <T>(fetch: IFetch, props: Props): Promise<UnwrappedTable<T>> => {
	const wrapped = {};
	for (const key in props) {
		wrapped[key] = fetch(props[key])
	}

	return allFetchSettled<T>(wrapped);
};


export const getRanking = (ranking: number): string => {
    return `${Math.floor(ranking)}k`
}

//  export const createSFetch(wrappedFetch: Fetch) => {
    //  const f = wrappedFetch ? wrappedFetch : window.fetch
    //  return
//  }
