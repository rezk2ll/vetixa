/**
 * Returns the ideal text color based on the background color
 *
 * @param background - the background color
 * @returns the text color
 */
export const getTextColor = (background: string): string => {
	console.log({ background });
	return background.charAt(0) === '#' ? getTextColorFromHex(background) : 'text-slate-800';
};

/**
 * returns the text color based on the background color (hexadecimal)
 *
 * @param background - the background color in hexadecimal format (e.g. #FFFFFF)
 * @returns the text color in hexadecimal format (e.g. #000000)
 */
export const getTextColorFromHex = (background: string): string => {
	const r = parseInt(background.substring(1, 3), 16);
	const g = parseInt(background.substring(3, 5), 16);
	const b = parseInt(background.substring(5, 7), 16);

	const yiq = r * 0.299 + g * 0.587 + b * 0.114;
	return 255 - yiq < 105 ? 'text-black' : 'text-white';
};
