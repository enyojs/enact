import {
	configureContainer,
	configureDefaults,
	containerAttribute,
	removeAllContainers,
	rootContainerId,
	setLastContainer
} from '../container';
import Spotlight from '../spotlight';

import {
	container,
	join,
	node,
	someSpottables,
	spottable,
	testScenario
} from './utils';

const nonSpottable = () => node({className: 'other'});

const scenarios = {
	complexTree: join(
		spottable({'data-spotlight-id': 's1'}),
		spottable(nonSpottable()),
		container({[containerAttribute]: 'first-container', children: join(
			someSpottables(2),
			container({[containerAttribute]: 'second-container', children: join(
				spottable({id: 'secondContainerFirstSpottable'}),
				someSpottables(2),
				container({
					[containerAttribute]: 'third-container',
					'data-spotlight-container-disabled': true,
					children: join(
						someSpottables(4),
						node({id: 'child-of-third'})
					)
				})
			)})
		)})
	)
};

const setupContainers = () => {
	Spotlight.setPointerMode(false);
	configureDefaults({
		selector: '.spottable'
	});
	configureContainer(rootContainerId);
	setLastContainer(rootContainerId);
};

const teardownContainers = () => {
	// clean up any containers we create for safe tests
	removeAllContainers();
};

const mockFocus = (n) => {
	const fn = jest.fn().mockImplementation(() => true);
	Object.defineProperty(n, 'focus', {
		get: () => fn
	});

	return fn;
};

describe('Spotlight', () => {
	describe('#focus', () => {
		beforeEach(setupContainers);
		afterEach(teardownContainers);

		test('should focus spottable by id', testScenario(
			scenarios.complexTree,
			(root) => {
				const fn = mockFocus(root.querySelector('[data-spotlight-id="s1"]'));
				Spotlight.focus('s1');

				expect(fn).toBeCalled();
			}
		));

		test('should focus container by id', testScenario(
			scenarios.complexTree,
			(root) => {
				configureContainer('first-container');

				const fn = mockFocus(root.querySelector('[data-spotlight-id="first-container"] > .spottable'));
				Spotlight.focus('first-container');

				expect(fn).toBeCalled();
			}
		));

		test('should focus spottable by node', testScenario(
			scenarios.complexTree,
			(root) => {
				const n = root.querySelector('[data-spotlight-id="s1"]');
				const fn = mockFocus(n);
				Spotlight.focus(n);

				expect(fn).toBeCalled();
			}
		));

		test('should focus container by node', testScenario(
			scenarios.complexTree,
			(root) => {
				configureContainer('first-container');

				const n = root.querySelector('[data-spotlight-id="first-container"]');
				const fn = mockFocus(n.querySelector('.spottable'));
				Spotlight.focus(n);

				expect(fn).toBeCalled();
			}
		));

		test('should focus spottable by selector', testScenario(
			scenarios.complexTree,
			(root) => {
				const n = root.querySelector('[data-spotlight-id="s1"]');
				const fn = mockFocus(n);
				Spotlight.focus('[data-spotlight-id="s1"]');

				expect(fn).toBeCalled();
			}
		));

		test('should focus container by selector', testScenario(
			scenarios.complexTree,
			(root) => {
				configureContainer('first-container');

				const n = root.querySelector('[data-spotlight-id="first-container"]');
				const fn = mockFocus(n.querySelector('.spottable'));
				Spotlight.focus('[data-spotlight-id="first-container"]');

				expect(fn).toBeCalled();
			}
		));

		test('should pass preventScroll option', testScenario(
			scenarios.complexTree,
			(root) => {
				const fn = mockFocus(root.querySelector('[data-spotlight-id="s1"]'));
				Spotlight.focus('s1', {preventScroll: true});

				expect(fn).toHaveBeenCalledWith({preventScroll: true});
			}
		));
	});

	describe('#move', () => {
		beforeEach(setupContainers);
		afterEach(teardownContainers);

		test('should return false when the direction is not one of \'left\', \'right\', \'up\' or \'down\'', testScenario(
			scenarios.complexTree,
			() => {
				const actual = Spotlight.move('leeeft');
				expect(actual).toBe(false);
			}
		));
	});

	describe('#initialize', () => {
		beforeEach(() => {
			jest.spyOn(window, 'addEventListener').mockImplementationOnce(() => {});
		});
		afterEach(() => {
			window.addEventListener.mockRestore();
		});

		test('should register event listener of several event types', () => {
			Spotlight.initialize();

			expect(window.addEventListener).toBeCalledWith('blur', expect.any(Function));
			expect(window.addEventListener).toBeCalledWith('focus', expect.any(Function));
			expect(window.addEventListener).toBeCalledWith('keydown', expect.any(Function));
			expect(window.addEventListener).toBeCalledWith('keyup', expect.any(Function));
			expect(window.addEventListener).toBeCalledWith('mouseover', expect.any(Function));
			expect(window.addEventListener).toBeCalledWith('mousemove', expect.any(Function));
		});
	});

	describe('#terminate', () => {
		beforeEach(() => {
			jest.spyOn(window, 'removeEventListener').mockImplementationOnce(() => {});
		});
		afterEach(() => {
			window.removeEventListener.mockRestore();
		});

		test('should remove event listener of several event types', () => {
			Spotlight.terminate();

			expect(window.removeEventListener).toBeCalledWith('blur', expect.any(Function));
			expect(window.removeEventListener).toBeCalledWith('focus', expect.any(Function));
			expect(window.removeEventListener).toBeCalledWith('keydown', expect.any(Function));
			expect(window.removeEventListener).toBeCalledWith('keyup', expect.any(Function));
			expect(window.removeEventListener).toBeCalledWith('mouseover', expect.any(Function));
			expect(window.removeEventListener).toBeCalledWith('mousemove', expect.any(Function));
		});
	});
});
