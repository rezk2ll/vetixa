import { describe, it, expect } from 'vitest';
import {
	getFileNameFromUrl,
	getReadableFileSize,
	getOriginalFileName,
	buildFileProxyUrl
} from './file';

describe('getFileNameFromUrl', () => {
	it('extracts filename after the last =', () => {
		expect(getFileNameFromUrl('http://example.com/files?name=photo.jpg')).toBe('photo.jpg');
	});

	it('handles URLs with multiple = signs', () => {
		expect(getFileNameFromUrl('http://example.com?a=b&file=doc.pdf')).toBe('doc.pdf');
	});
});

describe('getReadableFileSize', () => {
	it('formats bytes', () => {
		expect(getReadableFileSize(500)).toBe('500.00 B');
	});

	it('formats kilobytes', () => {
		expect(getReadableFileSize(1024)).toBe('1.00 KB');
		expect(getReadableFileSize(1536)).toBe('1.50 KB');
	});

	it('formats megabytes', () => {
		expect(getReadableFileSize(1048576)).toBe('1.00 MB');
	});

	it('formats gigabytes', () => {
		expect(getReadableFileSize(1073741824)).toBe('1.00 GB');
	});
});

describe('getOriginalFileName', () => {
	it('removes the hash suffix before extension', () => {
		expect(getOriginalFileName('http://example.com?file=photo_abc123.jpg')).toBe('photo.jpg');
	});

	it('handles filenames with multiple underscores', () => {
		expect(getOriginalFileName('http://example.com?file=my_file_name_hash.pdf')).toBe(
			'my_file_name.pdf'
		);
	});
});

describe('buildFileProxyUrl', () => {
	it('builds the correct proxy URL', () => {
		expect(buildFileProxyUrl('col1', 'rec1', 'file.jpg')).toBe(
			'/files?collection=col1&record=rec1&file=file.jpg'
		);
	});
});
