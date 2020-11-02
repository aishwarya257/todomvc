import { separateBadgesAndTask } from '../../../src/components/TodoForm/TodoForm.utils';

describe("TodoForm.utils", () => {
	describe("separateBadgesAndTask", () => {
		it("should process tasks without labels", () => {
			expect(separateBadgesAndTask('example input')).toBeFalsy();
		});
	});
});
