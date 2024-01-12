import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
import type { TypedPocketBase } from '$root/types';

export const createInstance = () => new PocketBase(PUBLIC_POCKETBASE_URL) as TypedPocketBase;

export default createInstance();
