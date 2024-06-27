import { createInstance } from '$lib/pocketbase';
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
		console.log(_);
	}

	event.locals.pb.autoCancellation(false);
	event.locals.user = event.locals.pb.authStore.model;

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
