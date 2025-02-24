import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Card, {CardBase} from '../Card';

const src = {
	'hd': 'http://lorempixel.com/64/64/city/1/',
	'fhd': 'http://lorempixel.com/128/128/city/1/',
	'uhd': 'http://lorempixel.com/256/256/city/1/'
};

describe('Card', () => {
	test('should support `children` prop', () => {
		const children = 'children';
		render(<CardBase data-testid="card" src={src.hd}>{children}</CardBase>);

		const expected = children;
		const card = screen.getByTestId('card');

		expect(card).toHaveTextContent(expected);
	});

	test('should apply `.horizontal` when `orientation="horizontal"`', () => {
		render(<CardBase data-testid="card" orientation="horizontal" src={src} />);

		const expected = 'horizontal';
		const card = screen.getByTestId('card');

		expect(card).toHaveClass(expected);
	});

	test('should apply `.vertical` when `oreintation="vertical"`', () => {
		render(<CardBase data-testid="card" orientation="vertical" src={src} />);

		const expected = 'vertical';
		const card = screen.getByTestId('card');

		expect(card).toHaveClass(expected);
	});

	test('should apply `.selected` when `selected`', () => {
		render(<CardBase data-testid="card" selected src={src} />);

		const expected = 'selected';
		const card = screen.getByTestId('card');

		expect(card).toHaveClass(expected);
	});

	test('should apply `.textOverlay` when `textOverlay`', () => {
		render(<CardBase data-testid="card" textOverlay src={src} />);

		const expected = 'textOverlay';
		const card = screen.getByTestId('card');

		expect(card).toHaveClass(expected);
	});

	test('should support string for `src` prop', () => {
		render(<CardBase src={src.hd} />);

		const expected = src.hd;
		const imgElement = screen.getAllByRole('img')[1];

		expect(imgElement).toHaveAttribute('src', expected);
	});

	test('should support object for `src` prop', () => {
		render(<CardBase src={src} />);

		const imgElementSrc = screen.getAllByRole('img')[1];

		expect(imgElementSrc).not.toBeNull();
	});

	test('should return a DOM node reference for `componentRef`', () => {
		const ref = jest.fn();
		render(<Card ref={ref} src={src} />);

		const expected = 'DIV';
		const actual = ref.mock.calls[0][0].nodeName;

		expect(actual).toBe(expected);
	});
});
