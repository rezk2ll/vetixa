import { createInstance } from '$lib/pocketbase';
import { handleProxy, PROXY_PATH } from '$utils/proxy';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = createInstance();
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
		console.error(_);
	}

	event.locals.pb.autoCancellation(false);
	event.locals.user = event.locals.pb.authStore.model;

	if (event.url.pathname.startsWith(PROXY_PATH)) {
		return handleProxy({ event, resolve });
	}

	const response = await resolve(event);

	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			httpOnly: false,
			sameSite: 'Lax',
			secure: false
		})
	);

	return response;
};
