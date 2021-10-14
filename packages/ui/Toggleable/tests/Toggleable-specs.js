import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

import Toggleable from '../Toggleable';

describe('Toggleable', () => {
	let data = [];

	const DivComponent = (props) => {
		data = props;
		return <div>Toggle</div>;
	};

	describe('#config', () => {
		test('should pass "selected" to the wrapped component', () => {
			const Component = Toggleable(DivComponent);
			render(<Component />);

			const expected = 'selected';

			expect(data).toHaveProperty(expected);
		});

		test('should pass configured "prop" "banana" as the toggled state\'s key to the wrapped component',
			() => {
				const prop = 'banana';
				const Component = Toggleable({prop: prop}, DivComponent);
				render(<Component defaultSelected />);

				expect(data).toHaveProperty(prop);
			});

		test('should pass "onToggle" handler to the wrapped component', () => {
			const Component = Toggleable(DivComponent);
			render(<Component />);

			const expected = 'onToggle';

			expect(data).toHaveProperty(expected);
		});

		test('should pass configured "toggle" handler to the wrapped component', () => {
			const handle = 'onClick';
			const Component = Toggleable({toggle: handle}, DivComponent);
			render(<Component />);

			expect(data).toHaveProperty(handle);

			const expected = 'function';
			const actual = typeof data.onClick;

			expect(actual).toBe(expected);
		});
	});

	describe('#prop', () => {
		test('should use defaultSelected prop when selected prop is omitted', () => {
			const Component = Toggleable(DivComponent);
			render(<Component defaultSelected />);

			const expectedProp = 'selected';
			const expectedValue = true;

			expect(data).toHaveProperty(expectedProp, expectedValue);
		});

		test('should warn when "defaultSelected" and "selected" props are provided', () => {
			const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
			const Component = Toggleable(DivComponent);
			render(<Component defaultSelected selected />);

			const expected = 1;

			expect(spy).toHaveBeenCalledTimes(expected);
		});

		test('should use defaultSelected prop when selected prop is null', () => {
			const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
			const Component = Toggleable(DivComponent);
			render(<Component defaultSelected selected={null} />);

			const expectedProp = 'selected';
			const expectedValue = true;

			expect(data).toHaveProperty(expectedProp, expectedValue);
			expect(spy).toHaveBeenCalled();
		});

		test('should use selected prop when selected changed from truthy to null', () => {
			const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
			const Component = Toggleable(DivComponent);
			const {rerender} = render(
				<Component defaultSelected selected />
			);

			rerender(<Component defaultSelected selected={null} />);

			const expectedProp = 'selected';
			const expectedValue = false;

			expect(data).toHaveProperty(expectedProp, expectedValue);
			expect(spy).toHaveBeenCalled();
		});

		test('should use defaultSelected prop when selected prop is undefined', () => {
			const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
			const Component = Toggleable(DivComponent);
			// eslint-disable-next-line no-undefined
			render(<Component defaultSelected selected={undefined} />);

			const expectedProp = 'selected';
			const expectedValue = true;

			expect(data).toHaveProperty(expectedProp, expectedValue);
			expect(spy).toHaveBeenCalled();
		});

		test('should use selected prop when selected changed from truthy to undefined', () => {
			const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
			const Component = Toggleable(DivComponent);
			const {rerender} = render(<Component defaultSelected selected />);
			// eslint-disable-next-line no-undefined
			rerender(<Component defaultSelected selected={undefined} />);

			const expectedProp = 'selected';
			const expectedValue = false;

			expect(data).toHaveProperty(expectedProp, expectedValue);
			expect(spy).toHaveBeenCalled();
		});

		test('should use selected prop when both selected and defaultSelected are defined', () => {
			const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
			const Component = Toggleable(DivComponent);
			render(<Component defaultSelected selected={false} />);

			const expectedProp = 'selected';
			const expectedValue = false;

			expect(data).toHaveProperty(expectedProp, expectedValue);
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('#forwarding events', () => {
		test('should invoke passed "onToggle" handler', () => {
			// eslint-disable-next-line
			console.error = () => {};
			const handleToggle = jest.fn();
			const Component = Toggleable(DivComponent);
			render(<Component onToggle={handleToggle} />);
			data.onToggle();

			const expected = 1;

			expect(handleToggle).toHaveBeenCalledTimes(expected);
		});

		test('should invoke passed "onActivate" handler', () => {
			// eslint-disable-next-line
			console.error = () => {};
			const handleActivate = jest.fn();
			const Component = Toggleable({activate: 'onActivate'}, DivComponent);
			render(<Component onActivate={handleActivate} />);
			data.onActivate();

			const expected = 1;

			expect(handleActivate).toHaveBeenCalledTimes(expected);
		});

		test('should invoke passed "onDeactivate" handler', () => {
			// eslint-disable-next-line
			console.error = () => {};
			const handleDeactivate = jest.fn();
			const Component = Toggleable({deactivate: 'onDeactivate'}, DivComponent);
			render(<Component onDeactivate={handleDeactivate} />);
			data.onDeactivate();

			const expected = 1;

			expect(handleDeactivate).toHaveBeenCalledTimes(expected);
		});

		test('should not invoke passed "onToggle" handler when disabled', () => {
			const handleToggle = jest.fn();
			const Component = Toggleable(DivComponent);
			render(<Component onToggle={handleToggle} disabled />);
			data.onToggle();

			expect(handleToggle).not.toHaveBeenCalled();
		});

		test('should invoke passed "onToggle" handler when disabled at creation and becoming enabled', () => {
			// eslint-disable-next-line
			console.error = () => {};
			const handleToggle = jest.fn();
			const Component = Toggleable(DivComponent);
			const {rerender} = render(<Component onToggle={handleToggle} disabled />);

			rerender(<Component onToggle={handleToggle} disabled={false} />);
			data.onToggle();

			const expected = 1;

			expect(handleToggle).toHaveBeenCalledTimes(expected);
		});

		test('should invoke changed "onToggle" handler', () => {
			// eslint-disable-next-line
			console.error = () => {};
			const handleToggle = jest.fn();
			const Component = Toggleable(DivComponent);
			const {rerender} = render(<Component />);

			rerender(<Component onToggle={handleToggle} />);
			data.onToggle();

			const expected = 1;

			expect(handleToggle).toHaveBeenCalledTimes(expected);
		});

		test('should not invoke passed "onActivate" handler when disabled', () => {
			const handleActivate = jest.fn();
			const Component = Toggleable({activate: 'onActivate'}, DivComponent);
			render(<Component onActivate={handleActivate} disabled />);
			data.onActivate();

			expect(handleActivate).not.toHaveBeenCalled();
		});

		test('should not invoke passed "onDeactivate" handler when "disabled"', () => {
			const handleDeactivate = jest.fn();
			const Component = Toggleable({deactivate: 'onDeactivate'}, DivComponent);
			render(<Component onDeactivate={handleDeactivate} disabled />);
			data.onDeactivate();

			expect(handleDeactivate).not.toHaveBeenCalled();
		});
	});

	describe('#updating state', () => {
		test('should update "selected" when "onToggle" invoked and is not controlled', () => {
			// eslint-disable-next-line
			console.error = () => {};
			const Component = Toggleable(DivComponent);
			render(<Component defaultSelected />);
			data.onToggle();

			const expectedProp = 'selected';
			const expectedValue = false;

			expect(data).toHaveProperty(expectedProp, expectedValue);
		});

		test('should update "selected" when "onJiggle" invoked and is not controlled', () => {
			// eslint-disable-next-line
			console.error = () => {};
			const Component = Toggleable({toggleProp: 'onJiggle'}, DivComponent);
			render(<Component defaultSelected />);
			data.onJiggle();

			const expectedProp = 'selected';
			const expectedValue = false;

			expect(data).toHaveProperty(expectedProp, expectedValue);
		});

		test('should not update "selected" when "onToggle" invoked and is not controlled but disabled',
			() => {
				const Component = Toggleable(DivComponent);
				render(<Component defaultSelected disabled />);
				data.onToggle();

				const expectedProp = 'selected';
				const expectedValue = true;


				expect(data).toHaveProperty(expectedProp, expectedValue);
			});

		test('should not update "selected" when "onActivate" invoked and is not controlled but disabled',
			() => {
				const Component = Toggleable({activate: 'onActivate'}, DivComponent);
				render(<Component defaultSelected={false} disabled />);
				data.onActivate();

				const expectedProp = 'selected';
				const expectedValue = false;


				expect(data).toHaveProperty(expectedProp, expectedValue);
			}
		);

		test('should not update "selected" when "onDeactivate" invoked and is not controlled but disabled',
			() => {
				const Component = Toggleable({deactivate: 'onDeactivate'}, DivComponent);
				render(<Component defaultSelected disabled />);
				data.onDeactivate();

				const expectedProp = 'selected';
				const expectedValue = true;

				expect(data).toHaveProperty(expectedProp, expectedValue);
			});

		test('should not update "selected" when "onToggle" invoked and is controlled', () => {
			const Component = Toggleable(DivComponent);
			render(<Component selected />);
			data.onToggle();

			const expectedProp = 'selected';
			const expectedValue = true;

			expect(data).toHaveProperty(expectedProp, expectedValue);
		});

		test('should not update "selected" when "onJiggle" invoked and is controlled', () => {
			const Component = Toggleable({toggleProp: 'onJiggle'}, DivComponent);
			render(<Component selected />);
			data.onJiggle();

			const expectedProp = 'selected';
			const expectedValue = true;

			expect(data).toHaveProperty(expectedProp, expectedValue);
		});

		test('should not update "selected" when "onActivate" invoked and is controlled', () => {
			const Component = Toggleable({activate: 'onActivate'}, DivComponent);
			render(<Component selected={false} />);
			data.onActivate();

			const expectedProp = 'selected';
			const expectedValue = false;

			expect(data).toHaveProperty(expectedProp, expectedValue);
		});

		test('should not update "selected" when "onDeactivate" invoked and is controlled', () => {
			const Component = Toggleable({deactivate: 'onDeactivate'}, DivComponent);
			render(<Component selected />);
			data.onDeactivate();

			const expectedProp = 'selected';
			const expectedValue = true;

			expect(data).toHaveProperty(expectedProp, expectedValue);
		});
	});

	describe('#new props', () => {
		test('should update "selected" with new props when controlled', () => {
			const Component = Toggleable(DivComponent);
			const {rerender} = render(<Component selected />);

			rerender(<Component selected={false} />);

			const expected = 'selected';

			expect(data).toHaveProperty(expected);
		});

		test('should not update "selected" with new props when not controlled', () => {
			const Component = Toggleable(DivComponent);
			const {rerender} = render(<Component defaultSelected />);

			const expectedProp = 'selected';
			const expectedValue = true;

			expect(data).toHaveProperty(expectedProp, expectedValue);

			rerender(<Component defaultSelected selected={false} />);

			expect(data).toHaveProperty(expectedProp, expectedValue);
		});

		test('should not update "selected" with custom prop and new defaultProp when not controlled', () => {
			const Component = Toggleable({prop: 'active'}, DivComponent);
			const {rerender} = render(<Component defaultSelected />);

			const expectedProp = 'active';
			const expectedValue = false;

			expect(data).toHaveProperty(expectedProp, expectedValue);

			rerender(<Component defaultSelected={false} />);

			expect(data).toHaveProperty(expectedProp, expectedValue);
		});
	});

	// testing regression from #2679 causing #2735
	test('should not update instance value when prop did not change', () => {
		const Component = Toggleable(DivComponent);
		const {rerender} = render(<Component />);
		data.onToggle();

		rerender(<Component />);

		const expectedProp = 'selected';
		const expectedValue = true;

		expect(data).toHaveProperty(expectedProp, expectedValue);
	});
});
