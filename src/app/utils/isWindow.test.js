import { isWindow } from './isWindow';

describe('isWindow', () => {
	beforeEach(() => {
		global.window = {};
	});

	it('should return true if window is defined', () => {
		expect(isWindow()).toBe(true);
	});
	it('should return false if window is not defined', () => {
		delete global.window;
		expect(isWindow()).toBe(false);
	});
});
