import type { FileInfo } from '$types';

const cached: Record<string, FileInfo> = {};

/**
 * fetches the file information from url and caches it.
 *
 * @param {string} url - the url of the file
 */
export const fetchFileInfo = async (url: string): Promise<FileInfo> => {
	if (cached[url]) {
		return cached[url];
	}

	const response = await fetch(url, {
		method: 'HEAD'
	});

	cached[url] = {
		mime: response.headers.get('content-type') || '',
		size: parseInt(response.headers.get('content-length') || '0')
	};

	return cached[url];
};

/**
 * returns the mime type and size of a file from cache.
 *
 * @param {string} url - the url of the file
 * @returns {FileInfo} the file info
 */
export const getFileInfo = (url: string): FileInfo => {
	return cached[url] || { mime: '', size: 0 };
};
