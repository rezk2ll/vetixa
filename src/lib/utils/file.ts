/**
 * returns the file name from url
 *
 * @param {string} url - the file url
 * @returns {string} - the file name
 */
export const getFileNameFromUrl = (url: string): string => url.substring(url.lastIndexOf('/') + 1);

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
