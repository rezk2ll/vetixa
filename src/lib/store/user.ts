import { writable } from 'svelte/store';
import type { UsersRecord } from '$types';
import type { AuthModel } from 'pocketbase';

export const currentUser = writable<UsersRecord | AuthModel>();
