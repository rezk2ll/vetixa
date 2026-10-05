import { PUBLIC_POCKETBASE_URL } from '$app/env/public';
import PocketBase from 'pocketbase';
import type { TypedPocketBase } from '$types';

export const createInstance = () => new PocketBase(PUBLIC_POCKETBASE_URL) as TypedPocketBase;

export default createInstance();
