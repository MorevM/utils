import { verifyFileAccept } from './verify-file-accept';

describe('verify-file-accept', () => {
	const imageFile = new File([], 'image.jpg', { type: 'image/jpeg' });
	const videoFile = new File([], 'image.mp4', { type: 'video/mp4' });
	const audioFile = new File([], 'sound.mp3', { type: 'audio/mp3' });
	const documentFile = new File([], 'document.docx');

	it('Returns `true` if `accept` argument is not specified or empty', () => {
		expect(verifyFileAccept(imageFile, undefined)).toBe(true);
		expect(verifyFileAccept(imageFile, null)).toBe(true);
		expect(verifyFileAccept(imageFile, '')).toBe(true);
	});

	it('Returns `true` for matches by type (including glob pattern and mixed MIME types)', () => {
		expect(verifyFileAccept(imageFile, 'image/jpeg')).toBe(true);
		expect(verifyFileAccept(imageFile, 'image/*, image/png, .png')).toBe(true);
		expect(verifyFileAccept(videoFile, 'image/jpeg, video/mp4')).toBe(true);
		expect(verifyFileAccept(videoFile, '.docx, video/*')).toBe(true);
		expect(verifyFileAccept(audioFile, 'audio/mp3')).toBe(true);
		expect(verifyFileAccept(audioFile, 'video/*, .mp3,        	.jpg')).toBe(true);
	});

	it('Returns `true` for matches by name', () => {
		expect(verifyFileAccept(imageFile, '.jpg')).toBe(true);
		expect(verifyFileAccept(documentFile, '.docx')).toBe(true);
	});

	it('Returns `false` if there are no matches', () => {
		expect(verifyFileAccept(imageFile, '.jpeg')).toBe(false);
		expect(verifyFileAccept(imageFile, 'video/*')).toBe(false);
		expect(verifyFileAccept(imageFile, 'image/png')).toBe(false);
		expect(verifyFileAccept(imageFile, 'image/png, image/tiff')).toBe(false);
		expect(verifyFileAccept(documentFile, '.doc, .txt')).toBe(false);
	});
});
