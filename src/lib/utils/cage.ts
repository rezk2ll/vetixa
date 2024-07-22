import { CageItem } from '$types';

/**
 * Compare two cages by code
 *
 * @example
 *  array.sort(cageCompare)
 *
 * @param {CageItem} a - the first item
 * @param {CageItem} b - the second item
 * @returns {number} the comparison result
 */
export const cageCompare = (a: CageItem, b: CageItem): number => {
	const extractParts = (str: string): [string, number] => {
		str = str.trim();
		const alphaPart = str.match(/^[^\d]*/)?.[0] ?? '';
		const numPart = str.match(/\d+$/)?.[0] ?? '0';
		return [alphaPart, parseInt(numPart, 10)];
	};

	const [alphaA, numA] = extractParts(a.code.toLowerCase());
	const [alphaB, numB] = extractParts(b.code.toLowerCase());

	const alphaCompare = alphaA.localeCompare(alphaB, undefined, { sensitivity: 'base' });
	if (alphaCompare !== 0) {
		return alphaCompare;
	}

	return numA - numB;
};
