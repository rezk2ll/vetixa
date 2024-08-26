import type { Handle } from '@sveltejs/kit';

export const PROXY_PATH = '/files';

export const handleProxy = (async ({ event }) => {
	const {
		url,
		request,
		locals: { pb }
	} = event;

  console.log('PROXYING FILE')

	const collection = url.searchParams.get('collection') as string;
	const record = url.searchParams.get('record') as string;
	const file = url.searchParams.get('file') as string;

	if (!collection || !record || !file) {
		return new Response('Missing parameters', { status: 404 });
	}

	const filePath = `/api/files/${collection}/${record}/${file}`;
	const fileUrl = pb.buildUrl(filePath);

	const requestHeaders = new Headers(request.headers);

	requestHeaders.delete('host');
	requestHeaders.delete('connection');

	if (requestHeaders.get('content-length') === '0') {
		requestHeaders.delete('content-length');
	}

	try {
		const response = await fetch(fileUrl.toString(), {
			redirect: 'manual',
			method: request.method,
			headers: requestHeaders,
			body: request.body,
			duplex: 'half'
		} as RequestInit);

		const responseHeaders = new Headers(response.headers);

		responseHeaders.delete('content-encoding');

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: responseHeaders
		});
	} catch (error) {
		console.error('Failed to proxy files', { error });
		throw error;
	}
}) satisfies Handle;
