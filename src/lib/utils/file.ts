/**
 * returns the file name from url
 *
 * @param {string} url - the file url
 * @returns {string} - the file name
 */
export const getFileNameFromUrl = (url: string): string => url.substring(url.lastIndexOf('=') + 1);

/**
 * returns a human readable file size
 *
 * @param {number} size - the file size in bytes
 * @returns {string} - the file size in human readable format
 */
export const getReadableFileSize = (size: number): string => {
	const i = Math.floor(Math.log(size) / Math.log(1024));
	const unit = ['B', 'KB', 'MB', 'GB', 'TB'][i];

	return `${(size / Math.pow(1024, i)).toFixed(2)} ${unit}`;
};

/**
 * returns the original file name from url
 *
 * @param {string} url - the file url
 * @returns {string} - the original file name
 */
export const getOriginalFileName = (url: string): string => {
	const fileName = getFileNameFromUrl(url);
	const extension = fileName.substring(fileName.lastIndexOf('.'));

	return `${fileName.substring(0, fileName.lastIndexOf('_'))}${extension}`;
};

/**
 * Get the dimensions of an image from its URL
 *
 * @param {string} url - The URL of the image
 * @returns {Promise<{ width: number; height: number }>} - A promise that resolves to an object containing the width and height of the image
 */
export const getImageDimensions = async (
	url: string
): Promise<{ width: number; height: number }> => {
	const img = await new Promise<HTMLImageElement>((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = (err) => reject(err);
		img.src = url;
	});

	return { width: img.naturalWidth, height: img.naturalHeight };
};

/**
 * Builds a proxy URL for a file
 *
 * @param {string} collectionId - The ID of the collection
 * @param {string} recordId - The ID of the record
 * @param {string} fileName - The name of the file
 * @returns {string} - The proxy URL for the file
 */
export const buildFileProxyUrl = (
	collectionId: string,
	recordId: string,
	fileName: string
): string => `/files?collection=${collectionId}&record=${recordId}&file=${fileName}`;
