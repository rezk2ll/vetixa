import { env } from '$env/dynamic/public';
import PocketBase from 'pocketbase';
import type { TypedPocketBase } from '$types';

export const createInstance = () => new PocketBase(env.PUBLIC_POCKETBASE_URL) as TypedPocketBase;

export default createInstance();
