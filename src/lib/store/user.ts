import { writable } from 'svelte/store';
import type { AuthModel } from 'pocketbase';

export const currentUser = writable<AuthModel>();
