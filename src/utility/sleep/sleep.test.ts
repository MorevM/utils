import { sleep } from './sleep';

describe('sleep', () => {
	it('Can make delay using `await`', async () => {
		const before = Date.now();
		await sleep(500);
		const after = Date.now();

		expect(after - before).toBeGreaterThan(500);
	});
});
