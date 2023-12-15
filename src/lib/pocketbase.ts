import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

export const createInstance = () => new PocketBase(PUBLIC_POCKETBASE_URL);

export default createInstance();
