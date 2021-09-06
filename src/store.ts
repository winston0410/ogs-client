import { writable } from 'svelte/store';
import type { IUser } from '$lib/typing'

export const currentUser = writable({})
export const gameList = writable([])
